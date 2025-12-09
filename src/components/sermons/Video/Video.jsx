// src/components/sermons/Latest/Video.jsx
import "./Video.css";
import useLatestSermon from "@/hooks/useLatestSermon";

const SERMON_TZ = "America/New_York";

function formatSermonDate(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Example output: "November 23, 2025"
  return date.toLocaleDateString("en-US", {
    timeZone: SERMON_TZ,
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Video({
  titleLabel = "Latest Sermon",
}) {
  const { sermon, error, loading } = useLatestSermon();

  const hasSermon = !!sermon && !!sermon.videoId;
  const iframeSrc = hasSermon
    ? `https://www.youtube.com/embed/${sermon.videoId}`
    : "";

  const displayTitle =
    hasSermon && sermon.title
      ? sermon.title
      : loading
      ? "Loading latest sermon…"
      : titleLabel;

  const displayDate = hasSermon ? formatSermonDate(sermon.publishedAt) : "";

  return (
    <section className="latest-sermon">
      <div className="latest-sermon__inner">
        <p className="latest-sermon__eyebrow">LATEST SERMON</p>

        <h2 className="latest-sermon__title">{displayTitle}</h2>

        {displayDate && (
          <p className="latest-sermon__date">{displayDate}</p>
        )}

        {error && (
          <p className="latest-sermon__error">
            Sorry, we couldn&apos;t load the latest sermon right now.
          </p>
        )}

        <div className="latest-sermon__video-card">
          <div className="latest-sermon__video-wrapper">
            {iframeSrc ? (
              <iframe
                className="latest-sermon__iframe"
                src={iframeSrc}
                title={sermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="latest-sermon__placeholder">
                {loading
                  ? "Loading video…"
                  : "The latest sermon will appear here soon."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
