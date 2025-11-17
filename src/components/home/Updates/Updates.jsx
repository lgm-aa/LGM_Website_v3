import React from "react";
import "./Updates.css";
import Button from "@/components/ui/Button/Button";

/* You can later feed these from an API / Google Drive */
const sampleBulletin = {
  title: "This Week's Bulletin",
  date: "November 3, 2025",
  items: [
    'Sermon: "Walking in Grace" - Pastor John Smith',
    "Fellowship lunch following service",
    "Youth group meeting at 6:00 PM",
  ],
  link: "#", // bulletin PDF or page
};

const sampleArchive = [
  { label: "October 27, 2025", href: "#" },
  { label: "October 20, 2025", href: "#" },
  { label: "October 13, 2025", href: "#" },
  { label: "October 6, 2025", href: "#" },
];

export default function Updates({
  bulletin = sampleBulletin,
  archives = sampleArchive,
}) {
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
          {/* Left — Weekly Bulletin (dark card) */}
          <article className="updates__card updates__card--dark">
            <div className="updates__cardHeader">
              <span className="icon-badge">
                {/* doc icon */}
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
                <h3 className="updates__cardTitle">{bulletin.title}</h3>
                <div className="updates__date">{bulletin.date}</div>
              </div>
            </div>

            <ul className="updates__list">
              {bulletin.items.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <Button
              as="a"
              href={bulletin.link}
              variant="primary"
              size="lg"
              className="updates__cta"
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              View Full Bulletin
              <span className="btn-ext">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13V6H11" />
                  <path d="M18 6L7 17" />
                </svg>
              </span>
            </Button>

            {/* soft radial accents */}
            <span className="updates__blob updates__blob--tl" />
            <span className="updates__blob updates__blob--br" />
          </article>

          {/* Right — Archives (light card) */}
          <aside className="updates__card updates__card--light">
            <div className="updates__cardHeader">
              <span className="icon-badge icon-badge--light">
                {/* calendar icon */}
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <h3 className="updates__cardTitle">Check our archives</h3>
            </div>

            <p className="updates__desc">
              Browse previous bulletins, sermon notes, and announcements from
              past weeks.
            </p>

            <div className="updates__archiveList">
              {archives.map((a, i) => (
                <a className="archiveItem" href={a.href} key={i}>
                  <span>{a.label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>

            <button className="archiveAllBtn" type="button">
              View All Archives
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
