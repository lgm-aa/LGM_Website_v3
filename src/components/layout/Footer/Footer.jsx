// src/components/layout/Footer/Footer.jsx
import React from "react";
// 👇 REMOVED: useNavigate
import { useLocation } from "react-router-dom";
import "./Footer.css";
import logo from "@/assets/lgm_logo_white.webp";

export default function Footer() {
  const location = useLocation();
  // 👇 REMOVED: const navigate = useNavigate();

  const handleScroll = (e, id) => {
    // Only intercept the click if we are ALREADY on the home page
    if (location.pathname === "/") {
      e.preventDefault(); 
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If we are NOT on home, we let the default href="/#id" run.
    // The browser will load the home page and jump to the section automatically.
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

          <p className="footer__tag">
            Creating disciples through grace
          </p>

          <div className="footer__service">
            <div>Sunday Service @ 1:30PM</div>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="footer__col">
          <h4>Quick Links</h4>
          <a href="/about">About Us</a>
          <a 
            href="/#ministries" 
            onClick={(e) => handleScroll(e, "ministries")}
          >
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
          <a href="/small-groups">Small Groups</a>
          <a 
            href="/#bulletin" 
            onClick={(e) => handleScroll(e, "bulletin")}
          >
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
          <div className="footer__socials">
            <a
              href="https://www.facebook.com/profile.php?id=100064729684652"
              aria-label="Facebook"
              className="social"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/livinggraceministry?igsh=MW01ZWJlZ3hkNXQwOQ=="
              aria-label="Instagram"
              className="social"
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