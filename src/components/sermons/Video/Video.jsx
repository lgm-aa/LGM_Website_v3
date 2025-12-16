// src/components/sermons/Latest/Video.jsx
import "./Video.css";
import useLatestSermon from "@/hooks/useLatestSermon";
import Button from "@/components/ui/Button/Button";

const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const SERMON_TZ = "America/New_York";

function formatSermonDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    timeZone: SERMON_TZ,
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Video({ titleLabel = "Latest Sermon" }) {
  const { sermon, error, loading } = useLatestSermon();

  // 1. Check strict conditions
  const hasSermon = !!sermon && !!sermon.videoId;
  const isFallbackMode = sermon?.isFallback === true;

  // Link to channel for the button
  const youtubeLink =
    sermon?.fallbackUrl || `https://www.youtube.com/channel/${CHANNEL_ID}`;

  /* -------------------------------------------------------------------------- */
  /* MODE A: CLEAN FALLBACK (No TV)                       */
  /* -------------------------------------------------------------------------- */
  if (!loading && isFallbackMode) {
    return (
      <section
        className="latest-sermon"
        style={{ minHeight: "auto", padding: "4rem 1rem" }}
      >
        <div className="latest-sermon__inner" style={{ textAlign: "center" }}>
          <h2 className="latest-sermon__title" style={{ marginBottom: "1rem" }}>
            Join Us on YouTube
          </h2>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "2rem",
              fontSize: "1.1rem",
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            Our latest service is available directly on our channel. Click below
            to watch the recording or join the livestream.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              as="a"
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Visit YouTube Channel &rarr;
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* MODE B: STANDARD VIDEO PLAYER                        */
  /* -------------------------------------------------------------------------- */

  let iframeSrc = "";
  if (hasSermon) {
    iframeSrc = `https://www.youtube.com/embed/${sermon.videoId}`;
  }

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
        {displayDate && <p className="latest-sermon__date">{displayDate}</p>}

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
