// src/components/sermons/Hero/Hero.jsx
import "./Hero.css";
import backgroundImage from "@/assets/lgm_building.webp";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

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

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>
    </main>
  );
}
