// src/components/Updates.jsx
import React from "react";
import "./Updates.css";
import Button from "@/components/ui/Button/Button";
import useLatestBulletin from "@/hooks/useLatestBulletin";
// 1. Import the shared date utility
import { getMostRecentSundayISOString } from "@/utils/timeNY";

export default function Updates() {
  const { data, loading, error } = useLatestBulletin();

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  let displayTitle = "Weekly Bulletin";
  let displayDate = "";

  if (loading) {
    displayTitle = "Checking for updates...";
  } else if (error) {
    displayTitle = "Bulletin Unavailable";
  } else if (data) {
    displayTitle = data.name.replace(".pdf", "");

    // 2. CHANGE: Use the calculated "Sunday" date instead of the file upload date
    // This ensures it matches the sermon logic exactly.
    displayDate = formatDate(getMostRecentSundayISOString());
  }

  const pdfLink = data?.url || "#";
  const embedUrl = data?.id
    ? `https://drive.google.com/file/d/${data.id}/preview`
    : null;

  const isDisabled = loading || error || !data?.url;

  return (
    <section className="updates">
      <div className="updates__container">
        <header className="updates__header">
          <h2 className="updates__title">This Week at Living Grace Ministry</h2>
          <p className="updates__subtitle">
            Stay updated on weekly announcements, sermon notes, and upcoming
            events.
          </p>
        </header>

        <div className="updates__grid">
          <article className="updates__card updates__card--dark">
            <div className="updates__cardHeader">
              <span className="icon-badge">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </span>
              <div>
                <h3 className="updates__cardTitle">{displayTitle}</h3>
                <div className="updates__date">{displayDate}</div>
              </div>
            </div>

            {embedUrl ? (
              <div className="updates__pdf-container">
                <iframe
                  src={embedUrl}
                  className="updates__pdf-frame"
                  title="Weekly Bulletin PDF"
                  allow="autoplay"
                ></iframe>
              </div>
            ) : (
              <div className="updates__content-placeholder">
                <p>
                  {loading
                    ? "Syncing with Google Drive..."
                    : "The bulletin will appear here once loaded."}
                </p>
              </div>
            )}

            <Button
              as="a"
              href={pdfLink}
              target={!isDisabled ? "_blank" : undefined}
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="updates__cta"
              style={{
                pointerEvents: isDisabled ? "none" : "auto",
                opacity: isDisabled ? 0.7 : 1,
              }}
            >
              <span className="btn-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13V6H11" />
                  <path d="M18 6L7 17" />
                </svg>
              </span>
              {loading ? "Loading..." : "Open PDF in New Tab"}
            </Button>

            <span className="updates__blob updates__blob--tl" />
            <span className="updates__blob updates__blob--br" />
          </article>
        </div>
      </div>
    </section>
  );
}
