import "./Hero.css";
import contact_hero from "@/assets/lgm_easter.webp";

export default function Hero() {
  return (
    <>
      {/* Background image */}
      <section
        className="contact-hero-section"
        style={{ backgroundImage: `url(${contact_hero})` }}
      />

      {/* Dark overlay */}
      <div className="contact-hero-overlay" />

      {/* Centered content */}
      <div className="contact-hero-content">
        <h1 className="contact-hero-title">CONTACT US</h1>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div>scroll</div>
        <svg
          className="chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}
