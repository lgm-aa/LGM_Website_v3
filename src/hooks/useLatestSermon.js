// src/hooks/useLatestSermon.js
import { useEffect, useState } from "react";
import {
  getLastSundayTimeRange,
  getMostRecentSundayISOString,
  NY_TZ,
} from "@/utils/timeNY";

/* -------------------------------------------------------------------------- */
/* CONFIG / CONSTANTS                                                         */
/* -------------------------------------------------------------------------- */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

const CACHE_KEY_SERMON = "latestSermonData";
const CACHE_KEY_TIMESTAMP = "latestSermonTimestamp";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

const IS_DEV = import.meta.env.DEV;

/* -------------------------------------------------------------------------- */
/* TIME HELPERS                                                               */
/* -------------------------------------------------------------------------- */

function isNoCacheWindow() {
  const now = new Date();
  const nyString = now.toLocaleString("en-US", { timeZone: NY_TZ });
  const nyDate = new Date(nyString);

  const day = nyDate.getDay();
  const hour = nyDate.getHours();
  const minute = nyDate.getMinutes();
  const currentMinutes = hour * 60 + minute;

  // Window: 1:00 PM (780) to 3:00 PM (900)
  const startMinutes = 13 * 60;
  const endMinutes = 15 * 60;

  const isSunday = day === 0;
  const inTimeWindow = currentMinutes >= startMinutes && currentMinutes < endMinutes;

  if (IS_DEV) {
    console.log(`🕒 [Time Check] NY Time: ${nyString}`);
    console.log(`   └─ Is Sunday? ${isSunday}`);
    console.log(`   └─ In Window (1:00pm-3:00pm)? ${inTimeWindow} (Current Mins: ${currentMinutes})`);
  }

  return isSunday && inTimeWindow;
}

/* -------------------------------------------------------------------------- */
/* CACHE HELPERS                                                              */
/* -------------------------------------------------------------------------- */

function buildCacheMeta(tsMs) {
  const date = new Date(tsMs);
  return {
    cacheTimestamp: tsMs,
    cacheHumanTime: date.toLocaleString("en-US", { timeZone: NY_TZ }),
  };
}

function getFreshCachedSermon() {
  if (IS_DEV) console.log("💾 [Cache Read] Checking local storage...");
  const cachedSermon = localStorage.getItem(CACHE_KEY_SERMON);
  const cachedTime = localStorage.getItem(CACHE_KEY_TIMESTAMP);

  if (!cachedSermon || !cachedTime) {
    if (IS_DEV) console.log("   └─ ❌ Cache Miss (Empty)");
    return null;
  }

  const age = Date.now() - Number(cachedTime);
  const isFresh = age < CACHE_DURATION_MS;

  if (IS_DEV) console.log(`   └─ Cache Age: ${(age / 1000 / 60).toFixed(1)} mins`);

  if (!isFresh) {
    if (IS_DEV) console.log("   └─ ❌ Cache Stale (Expired)");
    return null;
  }

  if (IS_DEV) console.log("   └─ ✅ Cache Hit (Fresh)");
  const parsed = JSON.parse(cachedSermon);
  return {
    ...parsed,
    publishedAt: getMostRecentSundayISOString(),
    ...buildCacheMeta(Number(cachedTime)),
  };
}

function cacheSermon(sermon, ts = Date.now()) {
  if (IS_DEV) console.log("💾 [Cache Write] Saving to LocalStorage...");
  localStorage.setItem(CACHE_KEY_SERMON, JSON.stringify(sermon));
  localStorage.setItem(CACHE_KEY_TIMESTAMP, ts.toString());
}

/* -------------------------------------------------------------------------- */
/* YOUTUBE HELPERS                                                            */
/* -------------------------------------------------------------------------- */

function buildSearchUrl(startTime, endTime) {
  return (
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&order=date&maxResults=5&type=video" +
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

async function fetchLiveVideo() {
  if (IS_DEV) console.log("📡 [Live Check] Querying YouTube for active livestreams...");
  const liveUrl =
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&type=video&eventType=live&maxResults=1";

  const res = await fetch(liveUrl);
  const data = await res.json();

  if (data.items && data.items.length > 0) {
    console.log("🔴 LIVE VIDEO FOUND:", data.items[0].snippet.title);
    return data.items[0];
  }

  if (IS_DEV) console.log("   └─ ⚪ No live video found.");
  return null;
}

function createSermonObject(videoId, title, publishedAt, isLive = false, isFallback = false) {
  return {
    videoId,
    title,
    publishedAt,
    fallbackUrl: `https://www.youtube.com/watch?v=${videoId}`,
    isFallback,
    ...(isLive && { isLive: true }),
    ...buildCacheMeta(Date.now()),
  };
}

function createGenericFallback() {
  const ts = Date.now();
  return {
    videoId: "FALLBACK_LINK",
    title: "Join us on YouTube",
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    isFallback: true,
    ...buildCacheMeta(ts),
  };
}

function isValidSermonVideo(video) {
  const title = video?.snippet?.title;
  const privacy = video?.status?.privacyStatus;
  const liveStatus = video?.snippet?.liveBroadcastContent;

  const isLive = liveStatus !== "none";
  const isLivestreamTitle = title.toLowerCase().includes("livestream");
  const isPrivate = privacy !== "public";

  if (IS_DEV) {
    console.log(`      📺 "${title}"`);
    console.log(`         - Privacy: ${privacy} ${isPrivate ? "(❌ REJECT)" : "(✅)"}`);
    console.log(`         - LiveStatus: ${liveStatus} ${isLive ? "(❌ REJECT)" : "(✅)"}`);
    console.log(`         - Title Check: ${isLivestreamTitle ? "(❌ REJECT 'livestream')" : "(✅)"}`);
  }

  if (!isLive && !isLivestreamTitle && !isPrivate) {
    if (IS_DEV) console.log("         🎉 MATCH FOUND!");
    return true;
  }
  return false;
}

async function fetchVideoInWindow(startTime, endTime, label) {
  if (IS_DEV) {
    console.log(`🔍 [API Search] Strategy: ${label}`);

    const startFormatted = new Date(startTime).toLocaleString("en-US", {
      timeZone: NY_TZ,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
    const endFormatted = new Date(endTime).toLocaleString("en-US", {
      timeZone: NY_TZ,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });

    console.log(`   └─ Window: ${startFormatted} -> ${endFormatted}`);
  }

  const searchUrl = buildSearchUrl(startTime, endTime);
  const res = await fetch(searchUrl);
  const searchData = await res.json();

  const items = searchData.items || [];
  if (IS_DEV) console.log(`   └─ Raw Items Found: ${items.length}`);

  if (items.length === 0) return null;

  const videoIds = items.map((i) => i?.id?.videoId).filter(Boolean).join(",");
  if (IS_DEV) console.log(`   └─ Fetching Details for IDs: ${videoIds}`);

  const detailRes = await fetch(buildDetailUrl(videoIds));
  const details = await detailRes.json();

  if (IS_DEV) console.log("   └─ Filtering Candidates:");
  const validVideo = details.items?.find(isValidSermonVideo);

  return validVideo || null;
}

/**
 * STRATEGY: Live Check -> Sunday Recording -> Rescue Recording -> Final Fallback
 */
async function fetchBestSermonStrategy() {
  if (IS_DEV) console.log("🚀 [Strategy Start] Finding best sermon...");

  // Priority #1: Check for active livestream
  if (IS_DEV) console.log("📡 [Priority 1] Checking for LIVE broadcast...");
  const liveVideo = await fetchLiveVideo();

  if (liveVideo) {
    if (IS_DEV) console.log("🔴 [Result] WE ARE LIVE! Showing livestream.");
    return createSermonObject(
      liveVideo.id.videoId,
      liveVideo.snippet.title,
      new Date().toISOString(),
      true // isLive
    );
  }

  // Priority #2: Search for recorded sermon
  if (IS_DEV) console.log("📼 [Priority 2] Not live. Searching for recorded sermon...");
  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();

  let rawVideo = await fetchVideoInWindow(publishedAfter, publishedBefore, "Strict Sunday");

  // Rescue search if nothing found
  if (!rawVideo) {
    if (IS_DEV) console.log("⚠️ No Sunday video. Attempting 'Rescue' search...");
    const rescueStart = publishedBefore;
    const rescueEnd = new Date(new Date(publishedBefore).getTime() + 48 * 60 * 60 * 1000).toISOString();
    rawVideo = await fetchVideoInWindow(rescueStart, rescueEnd, "Rescue (Mon/Tue)");
  }

  if (rawVideo) {
    if (IS_DEV) console.log("✅ [Result] Found RECORDED video:", rawVideo.snippet.title);
    return createSermonObject(
      rawVideo.id,
      rawVideo.snippet.title,
      getMostRecentSundayISOString()
    );
  }

  // Fallback
  if (IS_DEV) console.log("❌ [Result] No content found. Using Generic Fallback.");
  return createGenericFallback();
}

/* -------------------------------------------------------------------------- */
/* MAIN HOOK                                                                  */
/* -------------------------------------------------------------------------- */

export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      if (IS_DEV) console.log("--------------- USE LATEST SERMON HOOK ---------------");
      try {
        const skipCache = isNoCacheWindow();

        if (skipCache) {
          if (IS_DEV) console.log("🚫 [Rule] Sunday 1-3PM detected. Bypassing cache.");
        } else {
          const cached = getFreshCachedSermon();
          if (cached) {
            if (IS_DEV) console.log("⚡ [Complete] Using cached sermon.");
            setSermon(cached);
            setLoading(false);
            return;
          }
        }

        if (IS_DEV) console.log("🌐 [Fetch] Starting fresh data fetch sequence...");
        const bestSermon = await fetchBestSermonStrategy();
        setSermon(bestSermon);

        if (!skipCache && !bestSermon.isFallback) {
          cacheSermon(bestSermon, bestSermon.cacheTimestamp);
        } else {
          if (IS_DEV) {
            if (skipCache) console.log("🚫 [Cache Skip] Inside No-Cache Window");
            if (bestSermon.isFallback) console.log("🚫 [Cache Skip] Result is Fallback (Empty)");
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon ERROR:", err);
        setError("Failed to fetch sermon");
        setSermon(createGenericFallback());
        setLoading(false);
      }
    }

    run();
  }, []);

  return { sermon, error, loading };
}