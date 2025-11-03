import React from "react";
import "./Hero.css";
import Button from "@/components/ui/Button/Button";
import lgm_easter from "../../assets/lgm_easter.jpg";

export default function Hero() {
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
        <div>
          <h1 className="hero-title">LIVING GRACE MINISTRY</h1>
          <div className="hero-actions">
            <Button as="a" href="/" variant="primary" size="lg">
              Plan your visit
            </Button>
            <Button as="a" href="/" variant="primary" size="lg">
              Watch Online
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div>scroll</div>
        {/* down chevron */}
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
        {/* preserveAspectRatio='none' lets it stretch full width responsively */}
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          {/* Soft wave that dips slightly then rises — tweak path for your taste */}
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
