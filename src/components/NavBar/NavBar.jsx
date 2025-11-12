import React, { useState } from "react";
import "./NavBar.css";
import logoWhite from "../../assets/lgm_logo_white.png"; // your light-on-dark logo

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", href: "#about" },
    { label: "Ministries", href: "#ministries" }, // can leave as placeholder
    { label: "Sermons", href: "#sermons" },
    { label: "Donate", href: "#donate" },
  ];

  return (
    <header className="navbar-header">
      <nav className="navbar navbar--glass">
        <a href="/" className="navbar__brand">
          <img
            src={logoWhite}
            alt="Living Grace Ministry"
            className="navbar-logo"
          />
          <span className="navbar-title">Living Grace Ministry</span>
        </a>

        <div className="navbar__links">
          {links.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>

        <button
          className="navbar__menu"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="navbar-mobile navbar--glass">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="navbar-mobile__item"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
