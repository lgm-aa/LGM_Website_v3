import React from "react";
import "./Donate.css";
import give from "@/assets/ministry_campus.webp"; // change name/path if needed

export default function Donate() {
  return (
    <div className="donate-page">
      <section
        className="donate-hero"
        style={{ backgroundImage: `url(${give})` }}
      >
        {/* dark overlay */}
        <div className="donate-overlay" />

        {/* title + decorative line */}
        <div className="donate-content">
          <h1 className="donate-title">DONATE</h1>
          <div className="donate-title-line" />
        </div>

        {/* bottom wave */}
        <div className="donate-wave" aria-hidden="true">
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
      </section>

      {/* optional body content area */}
      <section className="donate-body">
        {/* add giving instructions / buttons here later */}
      </section>
    </div>
  );
}
