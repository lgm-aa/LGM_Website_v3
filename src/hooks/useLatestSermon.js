// src/hooks/useLatestSermon.js
import { useEffect, useState } from "react";
import {
  getLastSundayTimeRange,
  getMostRecentSundayISOString,
  NY_TZ,
} from "@/utils/timeNY";

/* -------------------------------------------------------------------------- */
/* CONFIG / CONSTANTS                           */
/* -------------------------------------------------------------------------- */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

const CACHE_KEY_SERMON = "latestSermonData";
const CACHE_KEY_TIMESTAMP = "latestSermonTimestamp";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

/* -------------------------------------------------------------------------- */
/* TIME HELPERS                                 */
/* -------------------------------------------------------------------------- */

function isNoCacheWindow() {
  const now = new Date();
  const nyString = now.toLocaleString("en-US", { timeZone: NY_TZ });
  const nyDate = new Date(nyString);
  const day = nyDate.getDay();   
  const hour = nyDate.getHours(); 
  const minute = nyDate.getMinutes();

  if (day !== 0) return false;

  const currentMinutes = hour * 60 + minute;
  const startMinutes = 13 * 60; // 1:00 PM
  const endMinutes = 15 * 60; // 3:00 PM

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/* -------------------------------------------------------------------------- */
/* CACHE HELPERS                               */
/* -------------------------------------------------------------------------- */

function buildCacheMeta(tsMs) {
  const date = new Date(tsMs);
  return {
    cacheTimestamp: tsMs,
    cacheHumanTime: date.toLocaleString("en-US", { timeZone: NY_TZ }),
  };
}

function getFreshCachedSermon() {
  const cachedSermon = localStorage.getItem(CACHE_KEY_SERMON);
  const cachedTime = localStorage.getItem(CACHE_KEY_TIMESTAMP);

  const isFresh =
    cachedSermon &&
    cachedTime &&
    Date.now() - Number(cachedTime) < CACHE_DURATION_MS;

  if (!isFresh) return null;

  const parsed = JSON.parse(cachedSermon);
  return {
    ...parsed,
    publishedAt: getMostRecentSundayISOString(),
    ...buildCacheMeta(Number(cachedTime)),
  };
}

function cacheSermon(sermon, ts = Date.now()) {
  localStorage.setItem(CACHE_KEY_SERMON, JSON.stringify(sermon));
  localStorage.setItem(CACHE_KEY_TIMESTAMP, ts.toString());
}

/* -------------------------------------------------------------------------- */
/* YOUTUBE HELPERS                               */
/* -------------------------------------------------------------------------- */

function buildSearchUrl(startTime, endTime) {
  return (
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&order=date&maxResults=1&type=video" +
    `&publishedAfter=${startTime}` +
    `&publishedBefore=${endTime}`
  );
}

function buildDetailUrl(videoIds) {
  return (
    "https://www.googleapis.com/youtube/v3/videos?" +
    `key=${API_KEY}&id=${videoIds}&part=snippet,status`
  );
}

// NEW: Search specifically for a "Live" broadcast right now
async function fetchLiveVideo() {
  const liveUrl = 
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&type=video&eventType=live&maxResults=1"; // eventType=live is the magic key

  const res = await fetch(liveUrl);
  const data = await res.json();

  if (data.items && data.items.length > 0) {
    return data.items[0];
  }
  return null;
}

// 4. SECONDARY FALLBACK: The Clean "Visit Channel" Card
function createGenericFallback() {
  const ts = Date.now();
  return {
    videoId: "FALLBACK_LINK",
    title: "Join us on YouTube",
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    isFallback: true, // This triggers the Clean Card in Video.jsx
    ...buildCacheMeta(ts),
  };
}

async function fetchVideoInWindow(startTime, endTime) {
  const searchUrl = buildSearchUrl(startTime, endTime);
  const res = await fetch(searchUrl);
  const searchData = await res.json();

  const items = searchData.items || [];
  const videoIds = items.map((i) => i?.id?.videoId).filter(Boolean).join(",");

  if (!videoIds) return null;

  const detailRes = await fetch(buildDetailUrl(videoIds));
  const details = await detailRes.json();

  const validVideo = details.items?.filter((v) => {
    const isLive = v?.snippet?.liveBroadcastContent !== "none";
    const isLivestreamTitle = v?.snippet?.title.toLowerCase().includes("livestream");
    const isPrivate = v?.status?.privacyStatus !== "public";
    return !isLive && !isLivestreamTitle && !isPrivate;
  });

  return validVideo?.length ? validVideo[0] : null;
}

/**
 * STRATEGY: Sunday -> Rescue -> Live Check -> Final Fallback
 */
async function fetchBestSermonStrategy() {
  console.log("🚀 Starting Sermon Search Strategy...");
  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();

  // 1. Strict Sunday Search
  let rawVideo = await fetchVideoInWindow(publishedAfter, publishedBefore);

  // 2. Rescue Search (Mon/Tue)
  if (!rawVideo) {
    console.log("⚠️ No Sunday video. Attempting 'Rescue' search...");
    const rescueStart = publishedBefore;
    const rescueEnd = new Date(new Date(publishedBefore).getTime() + 48 * 60 * 60 * 1000).toISOString();
    rawVideo = await fetchVideoInWindow(rescueStart, rescueEnd);
  }

  // If we found a recorded video, return it
  if (rawVideo) {
    return {
      videoId: rawVideo.id,
      title: rawVideo.snippet.title,
      publishedAt: getMostRecentSundayISOString(),
      fallbackUrl: `https://www.youtube.com/watch?v=${rawVideo.id}`,
      isFallback: false,
      ...buildCacheMeta(Date.now()),
    };
  }

  // 3. NEW: Live Check
  // If no recorded video, check if we are LIVE right now.
  console.log("⚠️ No recorded video. Checking for LIVE broadcast...");
  const liveVideo = await fetchLiveVideo();

  if (liveVideo) {
    console.log("🔴 WE ARE LIVE! Showing livestream.");
    return {
      videoId: liveVideo.id.videoId, // Use the REAL live ID, not a hardcoded link
      title: liveVideo.snippet.title, // "Sunday Service Live"
      publishedAt: getMostRecentSundayISOString(),
      fallbackUrl: `https://www.youtube.com/watch?v=${liveVideo.id.videoId}`,
      isFallback: false, // Treat it like a real video so the Player shows
      isLive: true,      // Optional flag if you want to style it differently
      ...buildCacheMeta(Date.now()),
    };
  }

  // 4. Secondary Fallback (Clean Card)
  console.log("❌ No sermon & Not Live. Using Generic Fallback.");
  return createGenericFallback();
}

/* -------------------------------------------------------------------------- */
/* MAIN HOOK                                  */
/* -------------------------------------------------------------------------- */

export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const skipCache = isNoCacheWindow(); // Returns TRUE at 1:00 PM

        if (skipCache) {
          // 1. We enter this block immediately
          console.log("🚫 Sunday detected. Bypassing cache.");
        } else {
          // 2. The code that reads the old 12:45 cache is inside this 'else'.
          // We NEVER reach here at 1:30 PM.
          const cached = getFreshCachedSermon();
          if (cached) return; 
        }

        // 3. We proceed to fetch fresh data immediately
        const bestSermon = await fetchBestSermonStrategy();
        setSermon(bestSermon);

        // Cache Logic:
        // 1. Don't cache if in the "No Cache" Sunday window
        // 2. Don't cache the "Generic Fallback" (keep checking for updates)
        // 3. Don't cache "Live" status for long (since it ends eventually), 
        //    but for simplicity, we treat "Live" as valid content for now.
        //    (The 1-hour cache might be too long for Live, but Acceptable)
        if (!skipCache && !bestSermon.isFallback) {
          cacheSermon(bestSermon, bestSermon.cacheTimestamp);
        } else {
          console.log("🚫 Skipping cache write");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon error:", err);
        setError("Failed to fetch sermon");
        // On error, show the clean card
        setSermon(createGenericFallback());
        setLoading(false);
      }
    }

    run();
  }, []);

  return { sermon, error, loading };
}