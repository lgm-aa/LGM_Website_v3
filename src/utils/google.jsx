const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  // Optional: helpful during local dev / misconfig
  console.warn("VITE_GOOGLE_API_KEY is not set");
}

export function youtubeSearchUrl(params) {
  const u = new URL("https://www.googleapis.com/youtube/v3/search");
  u.searchParams.set("key", API_KEY);
  // sensible defaults
  if (!params.part) u.searchParams.set("part", "snippet");
  if (!params.type) u.searchParams.set("type", "video");

  Object.entries(params).forEach(([k, v]) => {
    u.searchParams.set(k, v);
  });

  return u.toString();
}

export function driveListUrl(params) {
  const u = new URL("https://www.googleapis.com/drive/v3/files");
  u.searchParams.set("key", API_KEY);
  // basic fields so we don’t overfetch
  if (!params.fields) {
    u.searchParams.set(
      "fields",
      "files(id,name,mimeType,thumbnailLink,webViewLink,iconLink)"
    );
  }

  Object.entries(params).forEach(([k, v]) => {
    u.searchParams.set(k, v);
  });

  return u.toString();
}

export function driveFileMediaUrl(fileId) {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
}
