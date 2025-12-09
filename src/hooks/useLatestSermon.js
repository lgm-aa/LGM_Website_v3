// src/hooks/useLatestSermon.js
import { useEffect, useState } from "react";
import {
  getLastSundayTimeRange,
  getMostRecentSundayISOString,
  isSundayAfternoonNY,
  NY_TZ,
} from "@/utils/timeNY";

/* -------------------------------------------------------------------------- */
/*                               CONFIG / CONSTANTS                           */
/* -------------------------------------------------------------------------- */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

const CACHE_KEY_SERMON = "latestSermonData";
const CACHE_KEY_TIMESTAMP = "latestSermonTimestamp";

// Throttle background "ID-only" checks
const CACHE_KEY_LAST_ID_CHECK = "latestSermonLastIdCheck";
const ID_CHECK_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

// Cache duration: 1 hour
const CACHE_DURATION_MS = 1000 * 60 * 60;

/* -------------------------------------------------------------------------- */
/*                                CACHE HELPERS                               */
/* -------------------------------------------------------------------------- */

function buildCacheMeta(tsMs) {
  const date = new Date(tsMs);

  const cacheHumanTime = date.toLocaleString("en-US", {
    timeZone: NY_TZ,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const ageMs = Date.now() - tsMs;
  const ageMinutes = Math.floor(ageMs / 60000);
  const remainingMs = CACHE_DURATION_MS - ageMs;
  const minutesLeft = Math.max(0, Math.floor(remainingMs / 60000));

  return {
    cacheTimestamp: tsMs,
    cacheHumanTime,
    cacheAgeMinutes: ageMinutes,
    cacheMinutesLeft: minutesLeft,
    // When the next background ID-check is allowed
    nextIdCheckAllowedAt: new Date(
      tsMs + ID_CHECK_INTERVAL_MS
    ).toLocaleString("en-US", { timeZone: NY_TZ }),
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
/*                              YOUTUBE HELPERS                               */
/* -------------------------------------------------------------------------- */

function buildSundaySearchUrl(publishedAfter, publishedBefore) {
  return (
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&order=date&maxResults=5&type=video" +
    `&publishedAfter=${publishedAfter}` +
    `&publishedBefore=${publishedBefore}`
  );
}

function buildDetailUrl(videoIds) {
  return (
    "https://www.googleapis.com/youtube/v3/videos?" +
    `key=${API_KEY}&id=${videoIds}&part=snippet`
  );
}

/**
 * Fetch full Sunday sermon details (search + video details).
 * Returns a sermon object enriched with cache metadata, or null if none found.
 */
async function fetchSundaySermonFromYouTube() {
  console.log("🚀 Fetching full Sunday sermon…");

  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();
  const searchUrl = buildSundaySearchUrl(publishedAfter, publishedBefore);

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

  const nonLive = details.items?.filter(
    (v) =>
      v?.snippet?.liveBroadcastContent === "none" &&
      !v.snippet.title.toLowerCase().includes("livestream")
  );

  if (!nonLive?.length) return null;

  const vid = nonLive[0];

  const ts = Date.now();
  return {
    videoId: vid.id,
    title: vid.snippet.title,
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: "https://www.youtube.com/@LivingGraceMinistry",
    isFallback: false,
    ...buildCacheMeta(ts),
  };
}

function createLivestreamFallback() {
  const ts = Date.now();
  return {
    videoId: "LIVESTREAM",
    title: "Watch Our Sunday Livestream",
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
    isFallback: true,
    ...buildCacheMeta(ts),
  };
}

/**
 * Lightweight “ID-only” Sunday check.
 * Used to detect a new upload without fetching full details.
 */
async function fetchLatestSundayVideoIdOnly() {
  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();

  const url =
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=id&order=date&maxResults=1&type=video" +
    `&publishedAfter=${publishedAfter}` +
    `&publishedBefore=${publishedBefore}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.items?.[0]?.id?.videoId || null;
}

/* -------------------------------------------------------------------------- */
/*                             THE MAIN REACT HOOK                            */
/* -------------------------------------------------------------------------- */

export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        // 1) Try cache first
        const cached = getFreshCachedSermon();
        if (cached) {
          console.log("⚡ Using cached sermon:", cached);
          setSermon(cached);
          setLoading(false);

          // 1a) Background freshness check (Option C: throttled + Sunday-only)
          (async () => {
            try {
              if (!isSundayAfternoonNY()) {
                console.log("[ID-CHECK] Skipped — not Sunday afternoon (NY)");
                return;
              }

              const lastCheck = Number(
                localStorage.getItem(CACHE_KEY_LAST_ID_CHECK) || 0
              );
              const now = Date.now();

              if (now - lastCheck < ID_CHECK_INTERVAL_MS) {
                console.log("[ID-CHECK] Skipped — throttled");
                return;
              }

              localStorage.setItem(
                CACHE_KEY_LAST_ID_CHECK,
                now.toString()
              );

              const latestId = await fetchLatestSundayVideoIdOnly();
              console.log("[ID-CHECK] Latest Sunday ID:", latestId);

              if (!latestId || latestId === cached.videoId) {
                console.log("[ID-CHECK] Cache still points at latest sermon.");
                return;
              }

              console.log(
                "[ID-CHECK] New Sunday video detected — refreshing sermon data."
              );

              let fresh = await fetchSundaySermonFromYouTube();
              if (!fresh) fresh = createLivestreamFallback();

              setSermon(fresh);
              cacheSermon(fresh, fresh.cacheTimestamp ?? Date.now());
            } catch (bgErr) {
              console.error("[ID-CHECK] Background error:", bgErr);
            }
          })();

          return;
        }

        // 2) No cache → fetch from YouTube
        let latest = await fetchSundaySermonFromYouTube();
        if (!latest) latest = createLivestreamFallback();

        console.log("[Sermon] Fresh fetch:", latest);
        setSermon(latest);
        cacheSermon(latest, latest.cacheTimestamp ?? Date.now());
        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon API error:", err);
        setError("Failed to fetch sermon");
        setLoading(false);
      }
    }

    run();
  }, []);

  return { sermon, error, loading };
}
