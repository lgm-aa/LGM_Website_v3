// src/components/layout/Footer/Footer.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";
import logo from "@/assets/lgm_logo_white.webp";

export default function Footer() {
  const location = useLocation();

  const handleScroll = (e, id) => {
    // Only intercept the click if we are ALREADY on the home page.
    // Otherwise let the default href="/#id" run — the browser loads the
    // home page and ScrollToAnchor jumps to the section.
    if (location.pathname !== "/") return;

    const element = document.getElementById(id);
    if (!element) return;

    e.preventDefault();
    // The section's scroll-margin-top (Home.css) offsets it below the navbar.
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand Column */}
        <div className="footer__brand">
          <div className="footer__logoRow">
            <img
              src={logo}
              alt="Living Grace Ministry"
              className="footer__logo"
            />
            <div className="footer__name">
              <div>Living Grace Ministry</div>
              <div></div>
            </div>
          </div>

          <p className="footer__tag">Creating disciples through grace</p>

          <div className="footer__service">
            <div>Sunday Service @ 1:30PM</div>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="footer__col">
          <h4>Quick Links</h4>
          <a href="/about">About Us</a>
          <a href="/#ministries" onClick={(e) => handleScroll(e, "ministries")}>
            Ministries
          </a>
        </nav>

        {/* Get Involved */}
        <nav className="footer__col">
          <h4>Get Involved</h4>
          <a
            href="/#plan-section"
            onClick={(e) => handleScroll(e, "plan-section")}
          >
            Plan Your Visit
          </a>
          <a href="/#bulletin" onClick={(e) => handleScroll(e, "bulletin")}>
            Events
          </a>
        </nav>

        {/* Contact Column */}
        <div className="footer__col">
          <h4>Contact</h4>
          <div className="footer__row">
            <span className="i">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </span>
            <a href="mailto:livinggraceministry@gmail.com">
              livinggraceministry@gmail.com
            </a>
          </div>
          <div className="footer__row">
            <span className="i">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Living%20Grace%20Ministry%2C%201526%20Franklin%20St%2C%20Ann%20Arbor%2C%20MI%2048103"
              target="_blank"
              rel="noopener noreferrer"
            >
              1526 Franklin St, Ann Arbor, MI 48103
            </a>
          </div>
          <div className="footer__socials">
            <a
              href="https://discord.gg/zgny5dyxv4"
              aria-label="Discord"
              className="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.893a.077.077 0 0 0-.041.107a13.9 13.9 0 0 0 1.225 1.993a.076.076 0 0 0 .084.028a19.84 19.84 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/livinggraceministry?igsh=MW01ZWJlZ3hkNXQwOQ=="
              aria-label="Instagram"
              className="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="1.5" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@LivingGraceMinistry"
              aria-label="YouTube"
              className="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <path d="M10 15l5-3-5-3v6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        © {new Date().getFullYear()} Living Grace Ministry. All rights reserved.
      </div>
    </footer>
  );
}
