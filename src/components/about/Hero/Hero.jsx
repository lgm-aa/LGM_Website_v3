import "./Hero.css";
import about_hero from "@/assets/about_hero.webp";

export default function Hero() {
  return (
    <>
      {/* Background image */}
      <section
        className="about-hero-section"
        style={{ backgroundImage: `url(${about_hero})` }}
      />

      {/* Dark overlay */}
      <div className="about-hero-overlay" />

      {/* Centered content */}
      <div className="about-hero-content">
        <h1 className="about-hero-title">ABOUT US</h1>
      </div>
    </>
  );
}