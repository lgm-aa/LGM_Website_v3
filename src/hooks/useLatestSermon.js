/**
 * TODO: Implement this hook
 *
 * Steps:
 * 1. Generate a Google Cloud API key with YouTube Data API v3 enabled
 * 2. Use import.meta.env to load the key
 * 3. Build a YouTube search URL to fetch videos for the church channel
 * 4. Filter to find the latest sermon
 * 5. Add caching (optional)
 * 6. Extra credit: Add Sunday detection logic
 */


export default function useLatestSermon() {
  return {
    sermon: null,
    loading: false,
    error: "Not implemented — your task 😄",
  };
}
