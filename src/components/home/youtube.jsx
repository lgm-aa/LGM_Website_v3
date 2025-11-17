import { useYouTubeSearch } from "@/hooks/useYouTubeSearch";

export default function YouTubeLatest({ channelId, title = "Latest Sermons" }) {
  const { videos, loading, error } = useYouTubeSearch("", {
    channelId,
    maxResults: 6,
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {loading && <p>Loading videos…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
            className="border rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {v.thumb && (
              <img
                src={v.thumb}
                alt={v.title}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-3">
              <div className="font-medium line-clamp-2">{v.title}</div>
              <div className="text-xs text-gray-500 mt-1">{v.channel}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
