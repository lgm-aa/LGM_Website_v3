// src/components/about/Hero.jsx
import "./Hero.css";
import backgroundImage from "@/assets/lgm_easter.webp";

export default function Hero() {
  return (
    <main className="about">
      <section className="about-hero">
        <img
          src={backgroundImage}
          alt="Living Grace Ministry"
          className="about-hero__bg"
        />

        <div className="about-hero__overlay"></div>

        {/* Left-aligned title and CTA */}
        <div className="about-hero__content">
          <h1 className="about-hero__title">ABOUT US</h1>

        </div>

        {/* Bottom wave */}
        <div className="about-hero__wave" aria-hidden="true">
          <svg
            className="about-hero__wave-svg"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
          >
            <path
              className="about-hero__wave-path"
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
