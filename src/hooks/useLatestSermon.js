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
  
  // Create a date object relative to NY time to check hours/day correctly
  const nyString = now.toLocaleString("en-US", { timeZone: NY_TZ });
  const nyDate = new Date(nyString);

  const day = nyDate.getDay();   // 0 = Sunday
  const hour = nyDate.getHours(); 
  const minute = nyDate.getMinutes();
  const currentMinutes = hour * 60 + minute;
  
  // Window: 1:00 PM (780) to 3:00 PM (900)
  const startMinutes = 13 * 60; 
  const endMinutes = 15 * 60;   

  const isSunday = day === 0;
  const inTimeWindow = currentMinutes >= startMinutes && currentMinutes < endMinutes;
  
  console.log(`🕒 [Time Check] NY Time: ${nyString}`);
  console.log(`   └─ Is Sunday? ${isSunday}`);
  console.log(`   └─ In Window (1:00pm-3:00pm)? ${inTimeWindow} (Current Mins: ${currentMinutes})`);

  return isSunday && inTimeWindow;
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
  console.log("💾 [Cache Read] Checking local storage...");
  const cachedSermon = localStorage.getItem(CACHE_KEY_SERMON);
  const cachedTime = localStorage.getItem(CACHE_KEY_TIMESTAMP);

  if (!cachedSermon || !cachedTime) {
    console.log("   └─ ❌ Cache Miss (Empty)");
    return null;
  }

  const age = Date.now() - Number(cachedTime);
  const isFresh = age < CACHE_DURATION_MS;

  console.log(`   └─ Cache Age: ${(age / 1000 / 60).toFixed(1)} mins`);
  
  if (!isFresh) {
    console.log("   └─ ❌ Cache Stale (Expired)");
    return null;
  }

  console.log("   └─ ✅ Cache Hit (Fresh)");
  const parsed = JSON.parse(cachedSermon);
  return {
    ...parsed,
    publishedAt: getMostRecentSundayISOString(),
    ...buildCacheMeta(Number(cachedTime)),
  };
}

function cacheSermon(sermon, ts = Date.now()) {
  console.log("💾 [Cache Write] Saving to LocalStorage...");
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
    "&part=snippet&order=date&maxResults=5&type=video" + // Fetch 5 to be safe
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
  console.log("📡 [Live Check] Querying YouTube for active livestreams...");
  const liveUrl = 
    "https://www.googleapis.com/youtube/v3/search?" +
    `key=${API_KEY}&channelId=${CHANNEL_ID}` +
    "&part=snippet&type=video&eventType=live&maxResults=1"; 

  const res = await fetch(liveUrl);
  const data = await res.json();

  if (data.items && data.items.length > 0) {
    console.log("   └─ 🔴 LIVE VIDEO FOUND:", data.items[0].snippet.title);
    return data.items[0];
  }
  
  console.log("   └─ ⚪ No live video found.");
  return null;
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

async function fetchVideoInWindow(startTime, endTime, label) {
  console.log(`🔍 [API Search] Strategy: ${label}`);
  console.log(`   └─ Window: ${startTime} -> ${endTime}`);
  
  const searchUrl = buildSearchUrl(startTime, endTime);
  const res = await fetch(searchUrl);
  const searchData = await res.json();

  const items = searchData.items || [];
  console.log(`   └─ Raw Items Found: ${items.length}`);

  if (items.length === 0) return null;

  const videoIds = items.map((i) => i?.id?.videoId).filter(Boolean).join(",");
  console.log(`   └─ Fetching Details for IDs: ${videoIds}`);

  const detailRes = await fetch(buildDetailUrl(videoIds));
  const details = await detailRes.json();

  // FILTERING LOGIC WITH LOGS
  console.log("   └─ Filtering Candidates:");
  const validVideo = details.items?.find((v) => {
    const title = v?.snippet?.title;
    const privacy = v?.status?.privacyStatus;
    const liveStatus = v?.snippet?.liveBroadcastContent;
    
    // Check 1: Live Status
    const isLive = liveStatus !== "none";
    
    // Check 2: Title Trap
    const isLivestreamTitle = title.toLowerCase().includes("livestream");
    
    // Check 3: Privacy
    const isPrivate = privacy !== "public";

    console.log(`      📺 "${title}"`);
    console.log(`         - Privacy: ${privacy} ${isPrivate ? "(❌ REJECT)" : "(✅)"}`);
    console.log(`         - LiveStatus: ${liveStatus} ${isLive ? "(❌ REJECT)" : "(✅)"}`);
    console.log(`         - Title Check: ${isLivestreamTitle ? "(❌ REJECT 'livestream')" : "(✅)"}`);

    if (!isLive && !isLivestreamTitle && !isPrivate) {
      console.log("         🎉 MATCH FOUND!");
      return true;
    }
    return false;
  });

  return validVideo || null;
}

/**
 * STRATEGY: Live Check -> Sunday Recording -> Rescue Recording -> Final Fallback
 */
async function fetchBestSermonStrategy() {
  console.log("🚀 [Strategy Start] Finding best sermon...");

  // ------------------------------------------------------------------
  // 1. PRIORITY #1: LIVE CHECK
  // If we are actively streaming, this MUST take precedence over any 
  // recorded video (even if one was just uploaded).
  // ------------------------------------------------------------------
  console.log("📡 [Priority 1] Checking for LIVE broadcast...");
  const liveVideo = await fetchLiveVideo();

  if (liveVideo) {
    console.log("🔴 [Result] WE ARE LIVE! Showing livestream.");
    return {
      videoId: liveVideo.id.videoId,
      title: liveVideo.snippet.title,
      
      // 👇 CHANGED: Use the actual start time of the live video (or Today)
      publishedAt: new Date().toISOString(),
      
      fallbackUrl: `https://www.youtube.com/watch?v=${liveVideo.id.videoId}`,
      isFallback: false,
      isLive: true,
      ...buildCacheMeta(Date.now()),
    };
  }

  // ------------------------------------------------------------------
  // 2. PRIORITY #2: RECORDED SUNDAY VIDEO
  // If we are not live, look for the standard sermon upload.
  // ------------------------------------------------------------------
  console.log("📼 [Priority 2] Not live. Searching for recorded sermon...");
  const { publishedAfter, publishedBefore } = getLastSundayTimeRange();

  // Strict Sunday Search
  let rawVideo = await fetchVideoInWindow(publishedAfter, publishedBefore, "Strict Sunday");

  // Rescue Search (Mon/Tue) if nothing found
  if (!rawVideo) {
    console.log("⚠️ No Sunday video. Attempting 'Rescue' search...");
    const rescueStart = publishedBefore;
    const rescueEnd = new Date(new Date(publishedBefore).getTime() + 48 * 60 * 60 * 1000).toISOString();
    rawVideo = await fetchVideoInWindow(rescueStart, rescueEnd, "Rescue (Mon/Tue)");
  }

  // If we found a recorded video, return it
  if (rawVideo) {
    console.log("✅ [Result] Found RECORDED video:", rawVideo.snippet.title);
    return {
      videoId: rawVideo.id,
      title: rawVideo.snippet.title,
      publishedAt: getMostRecentSundayISOString(),
      fallbackUrl: `https://www.youtube.com/watch?v=${rawVideo.id}`,
      isFallback: false,
      ...buildCacheMeta(Date.now()),
    };
  }

  // ------------------------------------------------------------------
  // 3. FALLBACK
  // ------------------------------------------------------------------
  console.log("❌ [Result] No content found. Using Generic Fallback.");
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
      console.log("--------------- USE LATEST SERMON HOOK ---------------");
      try {
        const skipCache = isNoCacheWindow(); 

        if (skipCache) {
          console.log("🚫 [Rule] Sunday 1-3PM detected. Bypassing cache.");
        } else {
          const cached = getFreshCachedSermon();
          if (cached) {
            console.log("⚡ [Complete] Using cached sermon.");
            setSermon(cached);
            setLoading(false);
            return;
          }
        }

        // Fetch Fresh Data
        console.log("🌐 [Fetch] Starting fresh data fetch sequence...");
        const bestSermon = await fetchBestSermonStrategy();
        setSermon(bestSermon);

        // Cache Logic
        if (!skipCache && !bestSermon.isFallback) {
          cacheSermon(bestSermon, bestSermon.cacheTimestamp);
        } else {
          if(skipCache) console.log("🚫 [Cache Skip] Inside No-Cache Window");
          if(bestSermon.isFallback) console.log("🚫 [Cache Skip] Result is Fallback (Empty)");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("❌ useLatestSermon CRITICAL ERROR:", err);
        setError("Failed to fetch sermon");
        setSermon(createGenericFallback());
        setLoading(false);
      }
    }

    run();
  }, []);

  return { sermon, error, loading };
}