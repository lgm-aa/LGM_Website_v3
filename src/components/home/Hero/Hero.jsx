import React from "react";
import "./Hero.css";
import "@/components/AnimatedSection/AnimatedSection.css"; // make sure this is imported
import Button from "@/components/ui/Button/Button";
import lgm_easter from "@/assets/lgm_easter.webp";
import { useStaggeredFade } from "@/hooks/useStaggeredFade";

const handleScroll = (e, id) => {
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault(); // This stops the URL from changing
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

export default function Hero() {
  // 2 items: [0] title, [1] buttons
  // title starts at 200ms, buttons 1s later (interval = 1000)
  const { getClassName } = useStaggeredFade(2, {
    baseDelay: 200,
    interval: 1000,
  });

  return (
    <>
      {/* Background image */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${lgm_easter})` }}
      />

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Centered content */}
      <div className="hero-content">
        {/* Title fades in first */}
        <div className={getClassName(0)}>
          <h1 className="hero-title">LIVING GRACE MINISTRY</h1>
        </div>

        {/* Buttons fade in 1s after the title */}
        <div className={getClassName(1)}>
          <div className="hero-actions">
            <Button as="a" href="#plan-section" onClick={(e) => handleScroll(e, "updates__container")} variant="primary" size="lg">
              Plan your visit
            </Button>
            <Button as="a" href="/sermons" variant="primary" size="lg">
              Watch Online
            </Button>
          </div>
        </div>
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

      {/* Bottom wave */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path
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
    </>
  );
}
