import { useState, useEffect } from 'react';

// TODO: PHASE 1 - SECURITY & SETUP
// 1. Create a .env file in the project root if you haven't already.
// 2. Add VITE_YOUTUBE_API_KEY=your_key_here
// 3. Add VITE_YOUTUBE_CHANNEL_ID=your_channel_id_here
// 4. Replace the hardcoded strings below with import.meta.env variables.
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

const CACHE_KEY_SERMON = "latestSermonData";
const CACHE_KEY_TIMESTAMP = "latestSermonTimestamp";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

// TODO: PHASE 2 - HELPER FUNCTIONS (Write these outside the hook)

// A. Create a function to check for a LIVESTREAM specifically.
//    Hint: Use the API params: part=snippet, type=video, eventType=live
async function fetchLiveVideo() {
  // Return the video object if found, otherwise null
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const totalResults = data.pageInfo.totalResults;

    console.log("Checking for a LIVE video on LGM Channel...")

    const isLive = totalResults > 0;

    if (isLive) {
      console.log("LIVE VIDEO FOUND");
      return data.items[0];
    }
    
    console.log("Live video not found");
    return null;

  }
  catch (err) {
    console.error("LIVE CHECK FAILED", err);
    return null;
  }
}

// B. Create a function to search for a video within a specific time range.
//    Params: (startTime, endTime)
//    Hint: Use API params: publishedAfter=startTime, publishedBefore=endTime
async function fetchVideoInWindow(startTime, endTime) {
  // Return the video object if found, otherwise null
  
  try {
    const url =`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=5&publishedAfter=${startTime}&publishedBefore=${endTime}&key=${API_KEY}`;
    console.log("DEBUG fetchVideoInWindow URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    const items = data.items || [];

    if (items.length === 0) {
      console.log("No videos found in this time window");
      return null;
    }

    const ids = [];

    for (const item of items) {
      if (item && item.id && item.id.videoId) {
        ids.push(item.id.videoId);
      }
    }

    const videoIds = ids.join(",");

    if (!videoIds) return null;

    const videoListUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${videoIds}&key=${API_KEY}`;
    const videoListRes = await fetch(videoListUrl);
    const videoDetails = await videoListRes.json();
    const videos = videoDetails.items || [];

    const validVideo = videos.find((video) => {
      const title = video?.snippet?.title || "";
      const privacyStatus = video?.status?.privacyStatus;
      const liveStatus = video?.snippet?.liveBroadcastContent;

      const isCurrentlyLive = liveStatus !== "none";
      const hasLivestreamInTitle = title.toLowerCase().includes("livestream");
      const isNotPublic = privacyStatus !== "public";

      return !isCurrentlyLive && !hasLivestreamInTitle && !isNotPublic;
    });

    if (validVideo) {
      console.log("VALID VIDEO FOUND");
      return validVideo;
    }

    console.log("No valid video found in this window");
    return null;

  } 
  catch (err) {
    console.error("WINDOW SEARCH FAILED", err);
    return null;
  }

}

// C. Import your date helpers (getLastSundayTimeRange, etc.)
//    You will need these to define the "start" and "end" times for Step B.
function convertToNYTime(date = new Date()) {
  const NYfmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });

  // turns array into a dictionary
  const formattedParts = Object.fromEntries(
    NYfmt.formatToParts(date).map(part => [part.type, part.value])
  );

  const weekdayIndex = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(formattedParts.year),
    month: Number(formattedParts.month),
    day: Number(formattedParts.day),
    hour: Number(formattedParts.hour),
    minute: Number(formattedParts.minute),
    weekday: weekdayIndex[formattedParts.weekday],
  };

}

function getLastSundayTimeRange() {
  const now = new Date();
  const parts = convertToNYTime(now);
  let backDays = parts.weekday;
  
  if (parts.weekday === 0 && (parts.hour < 13 || (parts.hour === 13 && parts.minute < 30))) {
    backDays = 7
  }

  const sunday = new Date(now);
  sunday.setDate(sunday.getDate() - backDays);

  sunday.setHours(0, 0, 0, 0);
  const startIso = sunday.toISOString();

  sunday.setHours(23, 59, 59, 999);
  const endIso = sunday.toISOString();

  return { startIso, endIso };
}

function isSundayAfternoonNY() {
  const { weekday, hour } = convertToNYTime();
  // true if Sunday 1pm-3pm NY time
  return weekday === 0 && hour >= 13 && hour < 15;
}


// -------------------- CACHE HELPERS --------------------

function getCachedSermon() {
  const cached = localStorage.getItem(CACHE_KEY_SERMON);
  const ts = localStorage.getItem(CACHE_KEY_TIMESTAMP);

  if (!cached || !ts) return null;

  if (Date.now() - Number(ts) > CACHE_DURATION_MS) return null;

  return JSON.parse(cached);
}

function cacheSermon(sermon) {
  localStorage.setItem(CACHE_KEY_SERMON, JSON.stringify(sermon));
  localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
}


// -------------------- FALLBACK --------------------
function createFallbackSermon() {
  return {
    videoId: "FALLBACK",
    title: "Watch us on YouTube",
    publishedAt: new Date().toISOString(),
    fallbackUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    isFallback: true,
  };
}


// -------------------- MAIN HOOK --------------------

export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBestSermonStrategy(skipCache) {
      try {
        setLoading(true);

        // TODO: PHASE 3 - THE SEARCH STRATEGY (The "Waterfall")

        // STEP 1: Are we LIVE right now?
        // Call fetchLiveVideo(). If it returns a result:
        // - Set the sermon state.
        // - IMPORTANT: Force the 'publishedAt' date to be new Date().toISOString() 
        //   so it shows today's date, not the schedule date.
        // - Return immediately (stop the function).

        const live = await fetchLiveVideo();
        if (live) {
          const liveResult = {
            videoId: live.id.videoId,
            title: live.snippet.title,
            publishedAt: new Date().toISOString(),
            fallbackUrl: `https://www.youtube.com/watch?v=${live.id.videoId}`,
            isLive: true,
            isFallback: false,
          };
          setSermon(liveResult);
          if (!skipCache) cacheSermon(liveResult);
          setLoading(false);
          return;
        }


        // STEP 2: If not live, find LAST SUNDAY'S recording.
        // - Use getLastSundayTimeRange() to get the start/end times.
        // - Call fetchVideoInWindow(start, end).
        // - Check results: Ignore videos with "Livestream" in the title (unless renamed).
        // - If valid, set state and return.

        const { startIso, endIso } = getLastSundayTimeRange();
        let video = await fetchVideoInWindow(startIso, endIso);

        // STEP 3: If no Sunday video, try a "RESCUE" search (Monday/Tuesday).
        // - Sometimes uploads are late. Search the 48 hours after Sunday.
        if (!video) {
          const rescueStart = endIso;
          const rescueEnd = new Date(new Date(endIso).getTime() + 48 * 60 * 60 * 1000).toISOString();
          video = await fetchVideoInWindow(rescueStart, rescueEnd);
        }

        // STEP 4: Fallback
        // - If nothing is found above, set a "Fallback" object (Generic "Join us" card).
        if (video) {
          const result = {
            videoId: video.id,
            title: video.snippet.title,
            publishedAt: video.snippet.publishedAt,
            fallbackUrl: `https://www.youtube.com/watch?v=${video.id}`,
            isLive: false,
            isFallback: false,
          };
          setSermon(result);
          if (!skipCache && !result.isFallback) cacheSermon(result);
        } else {
          setSermon(createFallbackSermon());
        }
        
      } catch (err) {
        console.error("ERROR", err);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    }

    // TODO: PHASE 4 - CACHING (The "Wallet Saver")
    // 1. Before calling getBestSermonStrategy, check localStorage.
    // 2. If data exists AND is less than 1 hour old -> Use it & Skip Fetch.
    // 3. EXCEPTION: If it is Sunday between 1pm-3pm -> ALWAYS fetch (Ignore cache) 
    //    so the Livestream shows up instantly.

    const skipCache = isSundayAfternoonNY();
    if (!skipCache) {
      const cached = getCachedSermon();
      if (cached) {
        setSermon(cached);
        setLoading(false);
        return;
      }
    }

    getBestSermonStrategy(skipCache);
  }, []);

  return { sermon, loading, error };
}