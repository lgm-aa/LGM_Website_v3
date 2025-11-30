// src/hooks/useLatestSermon.js
import { useEffect, useState } from "react";

/**
 * ENV VARS — pulled from Vite
 * No hard-coded API keys inside the code.
 */
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const LIVESTREAM_ID = import.meta.env.VITE_LIVESTREAM_FALLBACK_ID;


/**
 * LOCAL STORAGE CACHING
 * We cache the final sermon result for 1 hour.
 * This reduces API calls and avoids unnecessary re-fetching.
 */
const CACHE_KEY_SERMON = "latestSermonData";
const CACHE_KEY_TIMESTAMP = "latestSermonTimestamp";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour


/**
 * TIME LOGIC — The complicated but important part 🤓
 *
 * Goal:
 *   We want the “most recent Sunday sermon.”
 *
 * Problem:
 *   On Sunday morning, YouTube videos may take hours to upload.
 *   But we still want the previous Sunday’s video until today’s is ready.
 *
 * Rules:
 *   - Sunday "rolls over" AFTER 1:30pm New York time.
 *   - Before 1:30pm: treat it as *last* Sunday.
 *   - After 1:30pm: treat it as *this* Sunday.
 */
const TZ = "America/New_York";
const CUTOFF_HOUR = 13; // 1pm
const CUTOFF_MIN = 30;

// Build helpful cache metadata given a timestamp in ms
function buildCacheMeta(tsMs) {
  const date = new Date(tsMs);

  // Human readable timestamp in New York time
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
  const minutesLeft = Math.max(
    0,
    Math.floor(remainingMs / 60000)
  );

  return {
    cacheHumanTime,
    cacheAgeMinutes: ageMinutes,
    cacheMinutesLeft: minutesLeft,
  };
}

/**
 * Helper: Convert a JS Date into NEW YORK broken-down parts
 * (year, month, day, hour, minute, second, weekday, timezone offset).
 *
 * Very important because:
 *   JavaScript Dates use the user's local timezone by default,
 *   but all logic must use **America/New_York** to determine the Sunday boundary.
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

  // Map weekday strings to numeric representation
  const wdMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  // Extract GMT offset (eg: GMT-5)
  const m = (parts.timeZoneName || "").match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
  const offMin = m
    ? parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0)
    : 0;

  return {
    y: +parts.year,
    m: +parts.month,
    d: +parts.day,
    hh: +parts.hour,
    mm: +parts.minute,
    ss: +parts.second,
    dow: wdMap[parts.weekday] ?? 0,
    offsetMinutes: offMin,
  };
}


/**
 * Convert a "New York wall clock" timestamp into a real UTC Date.
 *
 * Example:
 *   nyWallToUtc(2025, 11, 23, 0, 00) → Date(UTC equivalent of NY midnight)
 */
function nyWallToUtc(y, m, d, hh = 0, mm = 0, ss = 0, ms = 0) {
  const approxUtc = Date.UTC(y, m - 1, d, hh, mm, ss, ms);
  const probe = new Date(approxUtc);
  const { offsetMinutes } = getNYParts(probe);
  return new Date(approxUtc - offsetMinutes * 60_000);
}


/**
 * Determine the “effective Sunday" based on NY time.
 *
 * If today is Sunday *before* 1:30pm → use previous Sunday.
 * Otherwise → use this Sunday.
 */
function getEffectiveSundayNY(now = new Date()) {
  const { y, m, d, hh, mm, dow } = getNYParts(now);

  const isBeforeCutoffOnSunday =
    dow === 0 && (hh < CUTOFF_HOUR || (hh === CUTOFF_HOUR && mm < CUTOFF_MIN));

  // dow = 0 (Sun), 1 (Mon), 2 (Tue), etc.
  // If before cutoff → go back 7 days instead of dow days.
  const backDays = isBeforeCutoffOnSunday ? 7 : dow;

  // Convert "today NY midnight" into UTC
  const currentUtcMidnightNY = nyWallToUtc(y, m, d, 0, 0, 0, 0);

  // Subtract `backDays` to get the correct Sunday
  const sundayUtc = new Date(
    currentUtcMidnightNY.getTime() - backDays * 86400_000
  );

  // Now compute exact 00:00 and 23:59:59.999 for that Sunday
  const sp = getNYParts(sundayUtc);
  const startUtc = nyWallToUtc(sp.y, sp.m, sp.d, 0, 0, 0, 0);
  const endUtc = nyWallToUtc(sp.y, sp.m, sp.d, 23, 59, 59, 999);

  return {
    startIso: startUtc.toISOString(),
    endIso: endUtc.toISOString(),
    sundayStartIso: startUtc.toISOString(),
  };
}


/**
 * Get Sunday morning → Sunday night range for YouTube search.
 * (We only want Sunday sermons uploaded on that day.)
 */
function getLastSundayTimeRange() {
  const { startIso, endIso } = getEffectiveSundayNY();
  return { publishedAfter: startIso, publishedBefore: endIso };
}


/**
 * Always returns the iso-string for the START of the "effective Sunday".
 * Used to mark each sermon with the correct "publish date".
 */
function getMostRecentSundayISOString() {
  const { sundayStartIso } = getEffectiveSundayNY();
  return sundayStartIso;
}



/* -------------------------------------------------------------------------- */
/*                             THE MAIN REACT HOOK                            */
/* -------------------------------------------------------------------------- */

export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);  // Final sermon data returned to UI
  const [error, setError] = useState(null);    // Error message
  const [loading, setLoading] = useState(true); // Loading flag for UI


  /**
   * If no Sunday sermon video is found,
   * fall back to a livestream placeholder.
   */
    const setLivestreamFallback = () => {
    console.warn("⚠️ No sermon video found — using livestream fallback.");

    const nowTs = Date.now();
    const cacheMeta = buildCacheMeta(nowTs);

    const fallback = {
        videoId: LIVESTREAM_ID,
        title: "Watch Our Sunday Livestream",
        publishedAt: getMostRecentSundayISOString(),
        fallbackUrl: `https://www.youtube.com/watch?v=${LIVESTREAM_ID}`,
        isFallback: true,
        ...cacheMeta,
    };

    setSermon(fallback);
    localStorage.setItem(CACHE_KEY_SERMON, JSON.stringify(fallback));
    localStorage.setItem(CACHE_KEY_TIMESTAMP, nowTs.toString());
  };




  /**
   * MAIN EFFECT — runs only once.
   *
   * Flow:
   *   1. Check localStorage cache
   *   2. If cache is fresh → return cached result
   *   3. Otherwise → fetch from YouTube:
   *        - Search Sunday videos
   *        - Fetch details for those videos
   *        - Filter out livestreams
   *        - Return the first "real" sermon upload
   *   4. Save to cache & return the result
   */
  useEffect(() => {
    async function fetchLatestSermon() {
      try {
        /* -------------------- 1) Look for cached sermons -------------------- */
        const cachedSermon = localStorage.getItem(CACHE_KEY_SERMON);
        const cachedTime = localStorage.getItem(CACHE_KEY_TIMESTAMP);

        const isFresh =
          cachedSermon &&
          cachedTime &&
          Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION_MS;

        if (isFresh) {
            const parsed = JSON.parse(cachedSermon);
            const ts = Number(cachedTime);
            const cacheMeta = buildCacheMeta(ts);

            // Always correct the date to the correct Sunday in case new week started,
            // and attach cache metadata so the UI/debugger can see it.
            const normalized = {
                ...parsed,
                publishedAt: getMostRecentSundayISOString(),
                ...cacheMeta,
            };

            console.log("⚡ Using cached sermon (normalized):", normalized);
            setSermon(normalized);
            setLoading(false);
            return;
        }



        /* ------------------ 2) No cache → fetch from YouTube ---------------- */
        console.log("🚀 Fetching latest sermon from YouTube...");

        const { publishedAfter, publishedBefore } = getLastSundayTimeRange();

        // Search for Sunday videos
        const searchUrl =
          `https://www.googleapis.com/youtube/v3/search?` +
          `key=${API_KEY}&channelId=${CHANNEL_ID}` +
          `&part=snippet&order=date&maxResults=5&type=video` +
          `&publishedAfter=${publishedAfter}` +
          `&publishedBefore=${publishedBefore}`;

        console.log("[useLatestSermon] searchUrl:", searchUrl);

        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        console.log("[useLatestSermon] searchData:", searchData);

        const items = Array.isArray(searchData.items) ? searchData.items : [];

        // Extract the videoIds we need more info for
        const videoIds = items
          .map((item) => item?.id?.videoId)
          .filter(Boolean)
          .join(",");

        // If nothing uploaded that Sunday → fallback
        if (!videoIds) {
          setLivestreamFallback();
          setLoading(false);
          return;
        }


        /* -------- 3) Fetch detailed video info (title, broadcast type) ------- */
        const detailUrl =
          `https://www.googleapis.com/youtube/v3/videos?` +
          `key=${API_KEY}&id=${videoIds}&part=snippet`;

        console.log("[useLatestSermon] detailUrl:", detailUrl);

        const videosRes = await fetch(detailUrl);
        const videosData = await videosRes.json();
        console.log("[useLatestSermon] videosData:", videosData);

        // Remove livestreams or scheduled placeholders
        const nonLivestreamVideos = (videosData.items || []).filter(
          (video) =>
            video?.snippet?.liveBroadcastContent === "none" &&
            !video?.snippet?.title?.toLowerCase?.().includes("livestream")
        );

        if (nonLivestreamVideos.length === 0) {
          setLivestreamFallback();
          setLoading(false);
          return;
        }


        /* ---------- 4) Success → Use the first uploaded sermon video ---------- */
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

        const sermonWithMeta = {
        ...baseSermonData,
        ...cacheMeta,
        };

        console.log("[useLatestSermon] Final sermonData:", sermonWithMeta);

        // Save result to state + cache
        setSermon(sermonWithMeta);
        localStorage.setItem(CACHE_KEY_SERMON, JSON.stringify(sermonWithMeta));
        localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon – API error:", err);
        setError("Failed to fetch sermon");
        setLoading(false);
      }
    }

    fetchLatestSermon();
  }, []);


  /**
   * FINALLY: Export the result to the component.
   */
  return { sermon, error, loading };
}
