import { useState, useEffect } from 'react';

// TODO: PHASE 1 - SECURITY & SETUP
// 1. Create a .env file in the project root if you haven't already.
// 2. Add VITE_YOUTUBE_API_KEY=your_key_here
// 3. Add VITE_YOUTUBE_CHANNEL_ID=your_channel_id_here
// 4. Replace the hardcoded strings below with import.meta.env variables.
const API_KEY = ""; // <-- MOVE TO .ENV
const CHANNEL_ID = "UCFN3i5-SUCJctC_h5hMiBBw";             // <-- MOVE TO .ENV

// TODO: PHASE 2 - HELPER FUNCTIONS (Write these outside the hook)

// A. Create a function to check for a LIVESTREAM specifically.
//    Hint: Use the API params: part=snippet, type=video, eventType=live
async function fetchLiveVideo() {
  // Return the video object if found, otherwise null
}

// B. Create a function to search for a video within a specific time range.
//    Params: (startTime, endTime)
//    Hint: Use API params: publishedAfter=startTime, publishedBefore=endTime
async function fetchVideoInWindow(startTime, endTime) {
  // Return the video object if found, otherwise null
}

// C. Import your date helpers (getLastSundayTimeRange, etc.)
//    You will need these to define the "start" and "end" times for Step B.


export default function useLatestSermon() {
  const [sermon, setSermon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBestSermonStrategy() {
      try {
        setLoading(true);

        // TODO: PHASE 3 - THE SEARCH STRATEGY (The "Waterfall")
        
        // STEP 1: Are we LIVE right now?
        // Call fetchLiveVideo(). If it returns a result:
        // - Set the sermon state.
        // - IMPORTANT: Force the 'publishedAt' date to be new Date().toISOString() 
        //   so it shows today's date, not the schedule date.
        // - Return immediately (stop the function).

        // STEP 2: If not live, find LAST SUNDAY'S recording.
        // - Use getLastSundayTimeRange() to get the start/end times.
        // - Call fetchVideoInWindow(start, end).
        // - Check results: Ignore videos with "Livestream" in the title (unless renamed).
        // - If valid, set state and return.

        // STEP 3: If no Sunday video, try a "RESCUE" search (Monday/Tuesday).
        // - Sometimes uploads are late. Search the 48 hours after Sunday.

        // STEP 4: Fallback
        // - If nothing is found above, set a "Fallback" object (Generic "Join us" card).
        
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

    getBestSermonStrategy();
  }, []);

  return { sermon, loading, error };
}