// src/components/layout/NavBar/NavBar.jsx
import React from "react";
import "./NavBar.css";
import logoWhite from "@/assets/lgm_logo_white.webp"; // adjust path if needed

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Ministries", href: "#ministries" },
  { label: "Sermons", href: "#sermons" },
  { label: "Donate", href: "#donate" },
];

export default function NavBar() {
  return (
    <header className="lgm-nav">
      <div className="lgm-nav__inner">
        {/* Left: logo + title */}
        <a href="/" className="lgm-nav__brand">
          <img
            src={logoWhite}
            alt="Living Grace Ministry logo"
            className="lgm-nav__logo"
          />
          <span className="lgm-nav__title">Living Grace Ministry</span>
        </a>

        {/* Right: links */}
        <nav className="lgm-nav__links">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="lgm-nav__link">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
