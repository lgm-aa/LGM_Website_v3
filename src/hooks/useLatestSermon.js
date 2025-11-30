// src/hooks/useLatestSermon.js
import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                               CONFIG / CONSTANTS                           */
/* -------------------------------------------------------------------------- */

// ENV VARS — pulled from Vite (no hard-coded secrets)
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const LIVESTREAM_ID = import.meta.env.VITE_LIVESTREAM_FALLBACK_ID;

// LocalStorage cache: 1 hour
const CACHE_KEY_SERMON = "latestSermonData";
const CACHE_KEY_TIMESTAMP = "latestSermonTimestamp";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

// Timezone + Sunday cutoff (America/New_York, 1:30pm)
const TZ = "America/New_York";
const CUTOFF_HOUR = 13;
const CUTOFF_MIN = 30;

/* -------------------------------------------------------------------------- */
/*                               TIME HELPERS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Convert a Date to "New York parts" (Y/M/D/h/m/s, weekday, UTC offset).
 * We always compute Sundays in America/New_York regardless of user timezone.
 */
function getNYParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short",
    timeZoneName: "shortOffset",
  });

  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  );

  const wdMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const match = (parts.timeZoneName || "").match(
    /GMT([+-]\d{1,2})(?::(\d{2}))?/
  );
  const offsetMinutes = match
    ? parseInt(match[1], 10) * 60 + (match[2] ? parseInt(match[2], 10) : 0)
    : 0;

  return {
    y: +parts.year,
    m: +parts.month,
    d: +parts.day,
    hh: +parts.hour,
    mm: +parts.minute,
    ss: +parts.second,
    dow: wdMap[parts.weekday] ?? 0,
    offsetMinutes,
  };
}

/**
 * Convert a "New York wall clock" time to a real UTC Date.
 * Example: nyWallToUtc(2025, 11, 23, 0, 0) → Sunday midnight NY in UTC.
 */
function nyWallToUtc(y, m, d, hh = 0, mm = 0, ss = 0, ms = 0) {
  const approxUtc = Date.UTC(y, m - 1, d, hh, mm, ss, ms);
  const probe = new Date(approxUtc);
  const { offsetMinutes } = getNYParts(probe);
  return new Date(approxUtc - offsetMinutes * 60_000);
}

/**
 * Decide which Sunday is the “effective” one:
 * - If it's Sunday before 1:30pm NY → use previous Sunday
 * - Otherwise → use this Sunday
 */
function getEffectiveSundayNY(now = new Date()) {
  const { y, m, d, hh, mm, dow } = getNYParts(now);

  const beforeCutoffOnSunday =
    dow === 0 && (hh < CUTOFF_HOUR || (hh === CUTOFF_HOUR && mm < CUTOFF_MIN));

  const backDays = beforeCutoffOnSunday ? 7 : dow;
  const todayMidnightNY = nyWallToUtc(y, m, d, 0, 0, 0, 0);

  const sundayUtc = new Date(
    todayMidnightNY.getTime() - backDays * 86400_000
  );

  const sundayParts = getNYParts(sundayUtc);
  const startUtc = nyWallToUtc(sundayParts.y, sundayParts.m, sundayParts.d, 0, 0, 0, 0);
  const endUtc = nyWallToUtc(
    sundayParts.y,
    sundayParts.m,
    sundayParts.d,
    23,
    59,
    59,
    999
  );

  return {
    startIso: startUtc.toISOString(),
    endIso: endUtc.toISOString(),
    sundayStartIso: startUtc.toISOString(),
  };
}

/** Sunday start/end range used for YouTube search. */
function getLastSundayTimeRange() {
  const { startIso, endIso } = getEffectiveSundayNY();
  return { publishedAfter: startIso, publishedBefore: endIso };
}

/** ISO string for the "effective" Sunday start (used as the sermon date). */
function getMostRecentSundayISOString() {
  const { sundayStartIso } = getEffectiveSundayNY();
  return sundayStartIso;
}

/* -------------------------------------------------------------------------- */
/*                                CACHE HELPERS                               */
/* -------------------------------------------------------------------------- */

/** Build metadata describing when the cache entry was created. */
function buildCacheMeta(tsMs) {
  const date = new Date(tsMs);

  const cacheHumanTime = date.toLocaleString("en-US", {
    timeZone: TZ,
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
  };
}

/** Read and validate a fresh cached sermon, or return null. */
function getFreshCachedSermon() {
  const cachedSermon = localStorage.getItem(CACHE_KEY_SERMON);
  const cachedTime = localStorage.getItem(CACHE_KEY_TIMESTAMP);

  const isFresh =
    cachedSermon &&
    cachedTime &&
    Date.now() - Number(cachedTime) < CACHE_DURATION_MS;

  if (!isFresh) return null;

  const parsed = JSON.parse(cachedSermon);
  const ts = Number(cachedTime);
  const cacheMeta = buildCacheMeta(ts);

  return {
    ...parsed,
    // normalize date to the current effective Sunday
    publishedAt: getMostRecentSundayISOString(),
    ...cacheMeta,
  };
}

/** Persist sermon and timestamp to localStorage. */
function cacheSermon(sermon, tsMs = Date.now()) {
  localStorage.setItem(CACHE_KEY_SERMON, JSON.stringify(sermon));
  localStorage.setItem(CACHE_KEY_TIMESTAMP, tsMs.toString());
}

/* -------------------------------------------------------------------------- */
/*                              YOUTUBE HELPERS                               */
/* -------------------------------------------------------------------------- */

/** Build YouTube "search" URL constrained to the Sunday range. */
function buildSundaySearchUrl(publishedAfter, publishedBefore) {
  return (
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&order=date&maxResults=5&type=video" +
    `&publishedAfter=${publishedAfter}` +
    `&publishedBefore=${publishedBefore}`
  );
}

/** Build YouTube "videos" URL for detailed info. */
function buildDetailUrl(videoIds) {
  return (
    "https://www.googleapis.com/youtube/v3/videos?" +
    `key=${API_KEY}&id=${videoIds}&part=snippet`
  );
}

/**
 * Fetch the "real" uploaded sermon for the effective Sunday.
 * Returns a sermon object with cache metadata, or null if nothing suitable.
 */
async function fetchSundaySermonFromYouTube() {
  console.log("🚀 Fetching latest sermon from YouTube...");

  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();
  const searchUrl = buildSundaySearchUrl(publishedAfter, publishedBefore);
  console.log("[useLatestSermon] searchUrl:", searchUrl);

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  console.log("[useLatestSermon] searchData:", searchData);

  const items = Array.isArray(searchData.items) ? searchData.items : [];
  const videoIds = items
    .map((item) => item?.id?.videoId)
    .filter(Boolean)
    .join(",");

  if (!videoIds) return null;

  const detailUrl = buildDetailUrl(videoIds);
  console.log("[useLatestSermon] detailUrl:", detailUrl);

  const videosRes = await fetch(detailUrl);
  const videosData = await videosRes.json();
  console.log("[useLatestSermon] videosData:", videosData);

  const nonLivestreamVideos = (videosData.items || []).filter(
    (video) =>
      video?.snippet?.liveBroadcastContent === "none" &&
      !video?.snippet?.title?.toLowerCase?.().includes("livestream")
  );

  if (nonLivestreamVideos.length === 0) return null;

  const uploadedVideo = nonLivestreamVideos[0];

  const baseSermonData = {
    videoId: uploadedVideo.id,
    title: uploadedVideo.snippet.title,
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: "https://www.youtube.com/@LivingGraceMinistry",
    isFallback: false,
  };

  const nowTs = Date.now();
  const cacheMeta = buildCacheMeta(nowTs);

  return {
    ...baseSermonData,
    ...cacheMeta,
  };
}

/** Build a livestream fallback sermon object (also with cache meta). */
function createLivestreamFallback() {
  const nowTs = Date.now();
  const cacheMeta = buildCacheMeta(nowTs);

  return {
    videoId: LIVESTREAM_ID,
    title: "Watch Our Sunday Livestream",
    publishedAt: getMostRecentSundayISOString(),
    fallbackUrl: `https://www.youtube.com/watch?v=${LIVESTREAM_ID}`,
    isFallback: true,
    ...cacheMeta,
  };
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
        // 1) Try fresh cache
        const cached = getFreshCachedSermon();
        if (cached) {
          console.log("⚡ Using cached sermon (normalized):", cached);
          setSermon(cached);
          setLoading(false);
          return;
        }

        // 2) No cache → ask YouTube
        let latest = await fetchSundaySermonFromYouTube();

        // 3) If YouTube has nothing usable, fall back to livestream
        if (!latest) {
          console.warn(
            "⚠️ No Sunday sermon video found — using livestream fallback."
          );
          latest = createLivestreamFallback();
        }

        // 4) Save to state + cache
        console.log("[useLatestSermon] Final sermonData:", latest);
        setSermon(latest);
        cacheSermon(latest, latest.cacheTimestamp ?? Date.now());
        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon – API error:", err);
        setError("Failed to fetch sermon");
        setLoading(false);
      }
    }

    run();
  }, []);

  return { sermon, error, loading };
}
