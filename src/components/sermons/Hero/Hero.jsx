// src/components/sermons/Hero/Hero.jsx
import "./Hero.css";
import backgroundImage from "@/assets/lgm_building.webp";

export default function Hero() {
  return (
    <main className="sermons">
      <section
        className="sermons-hero"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="sermons-hero__overlay"></div>

        {/* Left-aligned title and CTA */}
        <div className="sermons-hero__content">
          <h1 className="sermons-hero__title">SERMONS</h1>

          {/* YouTube CTA Under Title */}
          <div className="sermons-hero__cta">
            <svg
              className="sermons-hero__cta-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="1.5" y="4" width="21" height="16" rx="3" fill="#FF0000" />
              <polygon points="10,9 16,12 10,15" fill="#FFF" />
            </svg>

            <a
              href="https://www.youtube.com/@LivingGraceMinistry"
              target="_blank"
              rel="noopener noreferrer"
              className="sermons-hero__cta-button"
            >
              Visit our YouTube page
            </a>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="sermons-hero__wave" aria-hidden="true">
          <svg
            className="sermons-hero__wave-svg"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
          >
            <path
              className="sermons-hero__wave-path"
              d="
                M0,64 
                C120,96 240,128 360,128
                C540,128 600,64 780,64
                C960,64 1080,120 1260,120
                C1350,120 1395,110 1440,104
                L1440,160 L0,160 Z
              "
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
