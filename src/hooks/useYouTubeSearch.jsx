import { useEffect, useState } from "react";
import { youtubeSearchUrl } from "@/utils/google";

export function useYouTubeSearch(query, { maxResults = 6, channelId } = {}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query && !channelId) return;

    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const url = youtubeSearchUrl({
          q: query || "",
          maxResults: String(maxResults),
          channelId: channelId || undefined,
          order: "date",
        });

        const res = await fetch(url);
        if (!res.ok) throw new Error(`YouTube error: ${res.status}`);
        const json = await res.json();

        if (cancelled) return;

        const items = (json.items || []).map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumb: item.snippet.thumbnails?.medium?.url ?? "",
          publishedAt: item.snippet.publishedAt,
        }));

        setVideos(items);
      } catch (e) {
        if (!cancelled) setError(e.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [query, maxResults, channelId]);

  return { videos, loading, error };
}
