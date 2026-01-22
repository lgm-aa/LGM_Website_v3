import "./Hero.css";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";
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
      <ScrollIndicator />
    </>
  );
}
