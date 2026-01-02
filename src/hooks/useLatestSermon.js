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
    "&part=snippet&order=date&maxResults=5&type=video" +
    `&publishedAfter=${startTime}` +
    `&publishedBefore=${endTime}`
  );
}

function buildDetailUrl(videoIds) {
  // 1. UPDATE: We now ask for 'status' so we can check privacy
  return (
    "https://www.googleapis.com/youtube/v3/videos?" +
    `key=${API_KEY}&id=${videoIds}&part=snippet,status`
  );
}

function createFallback() {
  const ts = Date.now();
  return {
    // We use a special ID to signal the UI to show the "Card" instead of a player
    videoId: "FALLBACK_LINK",
    title: "Join us on YouTube",
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    isFallback: true,
    ...buildCacheMeta(ts),
  };
}

/**
 * Searches for a valid sermon video within a specific time window.
 */
async function fetchVideoInWindow(startTime, endTime) {
  const searchUrl = buildSearchUrl(startTime, endTime);
  const res = await fetch(searchUrl);
  const searchData = await res.json();

  const items = searchData.items || [];
  const videoIds = items
    .map((i) => i?.id?.videoId)
    .filter(Boolean)
    .join(",");

  if (!videoIds) return null;

  const detailRes = await fetch(buildDetailUrl(videoIds));
  const details = await detailRes.json();

  // 2. UPDATE: Strict Filtering
  // - Must not be Live
  // - Must not have "livestream" in title
  // - Must be PUBLIC (ignores private/unlisted videos)
  const validVideo = details.items?.filter((v) => {
    const isLive = v?.snippet?.liveBroadcastContent !== "none";
    const isLivestreamTitle = v?.snippet?.title
      .toLowerCase()
      .includes("livestream");
    const isPrivate = v?.status?.privacyStatus !== "public";

    return !isLive && !isLivestreamTitle && !isPrivate;
  });

  return validVideo?.length ? validVideo[0] : null;
}

/**
 * STRATEGY: Sunday -> Rescue (Mon/Tue) -> Fallback Link
 */
async function fetchBestSermonStrategy() {
  console.log("🚀 Starting Sermon Search Strategy...");
  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();

  // STEP 1: Strict Sunday Search
  let rawVideo = await fetchVideoInWindow(publishedAfter, publishedBefore);

  // STEP 2: The "Rescue" Search (Monday & Tuesday)
  if (!rawVideo) {
    console.log("⚠️ No Sunday video found. Attempting 'Rescue' search...");
    const rescueStart = publishedBefore;
    const rescueEnd = new Date(
      new Date(publishedBefore).getTime() + 48 * 60 * 60 * 1000
    ).toISOString();

    rawVideo = await fetchVideoInWindow(rescueStart, rescueEnd);
  }

  // If found (Sunday or Rescue)
  if (rawVideo) {
    const ts = Date.now();
    return {
      videoId: rawVideo.id,
      title: rawVideo.snippet.title,
      publishedAt: getMostRecentSundayISOString(),
      fallbackUrl: `https://www.youtube.com/watch?v=${rawVideo.id}`,
      isFallback: false,
      ...buildCacheMeta(ts),
    };
  }

  // STEP 3: Fallback (No Player, just Link)
  console.log("❌ No sermon found. Using Link Fallback.");
  return createFallback();
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
        const cached = getFreshCachedSermon();
        if (cached) {
          console.log("⚡ Using cached sermon:", cached);
          setSermon(cached);
          setLoading(false);
          return;
        }

        const bestSermon = await fetchBestSermonStrategy();
        setSermon(bestSermon);
        cacheSermon(bestSermon, bestSermon.cacheTimestamp);
        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon error:", err);
        setError("Failed to fetch sermon");
        setLoading(false);
      }
    }

    run();
  }, []);

  return { sermon, error, loading };
}