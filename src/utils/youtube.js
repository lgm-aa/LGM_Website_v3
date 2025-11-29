// src/utils/youtube.js

const YT_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const YT_SEARCH_BASE = "https://www.googleapis.com/youtube/v3/search";

export function buildYouTubeSearchUrl({ channelId, query = "", maxResults = 6 }) {
  console.log("%c[youtube utils] buildYouTubeSearchUrl called", "color: #3b82f6; font-weight: bold;");
  console.log("[youtube utils] channelId:", channelId, "query:", query, "maxResults:", maxResults);

  if (!channelId) {
    throw new Error("buildYouTubeSearchUrl: channelId is required");
  }

  const params = new URLSearchParams({
    key: YT_API_KEY,
    part: "snippet",
    channelId,
    maxResults: String(maxResults),
    order: "date",
    type: "video",
  });

  if (query && query.trim()) {
    params.set("q", query.trim());
  }

  const url = `${YT_SEARCH_BASE}?${params.toString()}`;
  console.log("[youtube utils] Final YouTube Search URL:", url);

  return url;
}

export function parseYouTubeItem(item) {
  const parsed = {
    id: item.id?.videoId ?? item.id,
    title: item.snippet?.title ?? "",
    channel: item.snippet?.channelTitle ?? "",
    thumb: item.snippet?.thumbnails?.medium?.url ?? "",
    publishedAt: item.snippet?.publishedAt ?? "",
  };

//   console.log("[youtube utils] Parsed video item:", parsed);

  return parsed;
}

export function parseYouTubeResponse(json) {
  console.log("%c[youtube utils] parseYouTubeResponse called", "color: #a855f7; font-weight: bold;");
  const items = Array.isArray(json.items) ? json.items : [];
  console.log("[youtube utils] Raw items count:", items.length);

  const parsed = items.map(parseYouTubeItem);
  console.log("[youtube utils] Parsed videos:", parsed);

  return parsed;
}

export function getLatestVideo(videos) {
  const latest = videos[0] ?? null;
  console.log("[youtube utils] getLatestVideo:", latest);
  return latest;
}

export function filterVideosByTitle(videos, keyword) {
  console.log("[youtube utils] filterVideosByTitle keyword:", keyword);
  if (!keyword) return videos;

  const lower = keyword.toLowerCase();
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(lower)
  );

  console.log("[youtube utils] Filtered videos:", filtered);
  return filtered;
}
