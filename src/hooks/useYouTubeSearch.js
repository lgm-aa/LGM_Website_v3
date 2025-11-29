import { useEffect, useState } from "react";
import { youtubeSearchUrl } from "@/utils/googleAPI";

const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export function useYouTubeSearch(query, { maxResults = 6 } = {}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 useYouTubeSearch triggered with:", {
      query,
      maxResults,
      channelId,
    });

    if (!query && !channelId) {
      console.log("⏭ Skipping fetch — no query or channelId provided.");
      return;
    }

    let cancelled = false;

    async function run() {
      console.log("🚀 Starting YouTube fetch...");

      try {
        setLoading(true);
        setError(null);

        // Build the API URL
        const url = youtubeSearchUrl({
          q: query || "",
          maxResults: String(maxResults),
          channelId: channelId || undefined,
          order: "date",
        });

        console.log("🌐 Fetching YouTube API URL:", url);

        const res = await fetch(url);

        console.log("📥 YouTube response status:", res.status);

        if (!res.ok) {
          const errTxt = `YouTube error: ${res.status}`;
          console.error("❌ API error:", errTxt);
          throw new Error(errTxt);
        }

        const json = await res.json();
        console.log("📦 Raw YouTube JSON:", json);

        if (cancelled) {
          console.log("🛑 Fetch cancelled — component unmounted.");
          return;
        }

        const items = (json.items || []).map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumb: item.snippet.thumbnails?.medium?.url ?? "",
          publishedAt: item.snippet.publishedAt,
        }));

        console.log("🎬 Parsed video items:", items);

        setVideos(items);
      } catch (e) {
        if (!cancelled) {
          console.error("🔥 Error in useYouTubeSearch:", e);
          setError(e.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          console.log("✅ Finished fetch. loading=false");
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      console.log("🔚 useYouTubeSearch cleanup — cancelling fetch");
      cancelled = true;
    };
  }, [query, maxResults]);

  return { videos, loading, error };
}
