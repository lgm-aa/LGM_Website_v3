import React from "react";
import "./Footer.css";
import logo from "@/assets/lgm_logo_white.webp"; // adjust path if needed

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logoRow">
            <img
              src={logo}
              alt="Living Grace Ministry"
              className="footer__logo"
            />
            <div className="footer__name">
              <div>Living Grace</div>
              <div>Ministry</div>
            </div>
          </div>

          <p className="footer__tag">
            Creating disciples
            <br />
            through grace
          </p>

          <div className="footer__service">
            <div>Regular Service</div>
            <div>Sunday 1:30pm</div>
          </div>

          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="social">
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
            <a href="#" aria-label="Instagram" className="social">
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
            <a href="#" aria-label="YouTube" className="social">
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

        {/* Quick Links */}
        <nav className="footer__col">
          <h4>Quick Links</h4>
          <a href="/about">About Us</a>
          <a href="#">Our Beliefs</a>
          <a href="#ministries">Ministries</a>
          <a href="#">Events</a>
          <a href="#">Contact Us</a>
        </nav>

        {/* Get Involved */}
        <nav className="footer__col">
          <h4>Get Involved</h4>
          <a href="#">Plan Your Visit</a>
          <a href="#">Small Groups</a>
          <a href="#">Volunteer</a>
          <a href="#">Prayer Requests</a>
        </nav>

        {/* Contact */}
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
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.62-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l.67-1.18a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <a href="tel:+1-000-000-0000">(XXX) 123-2303</a>
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
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </span>
            <a href="mailto:info@livinggrace.org">info@livinggrace.org</a>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        © {new Date().getFullYear()} Living Grace Ministry. All rights reserved.
      </div>
    </footer>
  );
}
