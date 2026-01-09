// src/components/sermons/Latest/Latest.jsx
import useLatestSermon from "../../../hooks/useLatestSermon";
import "./Video.css";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Video() {
  const { sermon, loading, error } = useLatestSermon();

  const hasSermon = !!sermon && !!sermon.videoId;

  const date = hasSermon ? formatDate(sermon.publishedAt) : null;
  const title = hasSermon ? sermon.title : "Loading Latest Sermon...";

  return (
    <section className="latest-sermon">
      <div className="latest-sermon__inner">
        <p className="latest-sermon__eyebrow">LATEST SERMON</p>

        <h2 className="latest-sermon__title">
          {title}
        </h2>

        {date && (<p className="latest-sermon__date">{date}</p>) }

        <div className="latest-sermon__video-card">
          <div className="latest-sermon__video-wrapper">
            {hasSermon ? (
              <iframe
                className="latest-sermon__iframe"
                src={`https://www.youtube.com/embed/${sermon.videoId}`}
                title="Trauma and the God who Sees - Living Grace Ministry"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
             ) : (
              <div className="latest-sermon__placeholder">
                Loading video…
              </div>
            )

            }
          </div>
        </div>
      </div>
    </section>
  );
}