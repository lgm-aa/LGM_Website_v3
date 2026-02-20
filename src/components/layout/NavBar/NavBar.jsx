// src/components/layout/NavBar/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "./NavBar.css";
import logoWhite from "@/assets/lgm_logo_white.webp"; // adjust path if needed

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      const onScroll = () => setScrolledPastHero(window.scrollY > 20);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPastHero(!entry.isIntersecting),
      { threshold: 0}
    );

    observer.observe(hero);
    return () => observer.disconnect();

  }, [pathname]);
  
  return (
    <header className={`lgm-nav ${scrolledPastHero ? "lgm-nav__blur" : ""}`}>
      <div className="lgm-nav__inner">
        {/* Left: logo + title */}
        <Link to="/" className="lgm-nav__brand">
          <img
            src={logoWhite}
            alt="Living Grace Ministry logo"
            className="lgm-nav__logo"
          />
          <span className="lgm-nav__title">Living Grace Ministry</span>
        </Link>

        {/* Right: links */}
        <nav className="lgm-nav__links">  
          <div className="lgm-nav__item">
            <Link to="/about" className="lgm-nav__link">
              About
            </Link>
          </div>

          {/* Ministries dropdown */}
          <div 
            className={`lgm-nav__item lgm-nav__item--dropdown ${
              openDropdown === 'ministries' ? 'lgm-nav__item--open' : ''
            }`}
            onMouseEnter={() => setOpenDropdown('ministries')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span 
              className="lgm-nav__link lgm-nav__link--dropdown"
              onClick={() => toggleDropdown('ministries')}
            >
              Ministries
            </span>
            
            <div className="lgm-nav__dropdown">
              <Link to="/childrens" className="lgm-nav__dropdown-link" onClick={closeDropdown}>
                Children's
              </Link>
              <Link to="/youth-group" className="lgm-nav__dropdown-link" onClick={closeDropdown}>
                Youth
              </Link>
              <Link to="/campus" className="lgm-nav__dropdown-link" onClick={closeDropdown}>
                Campus
              </Link>
              <Link to="/post-grad" className="lgm-nav__dropdown-link" onClick={closeDropdown}>
                Post Grad
              </Link>
              <Link to="/adult-family" className="lgm-nav__dropdown-link" onClick={closeDropdown}>
                Adult / Family
              </Link>
            </div>
          </div>

          <div className="lgm-nav__item">
            <Link to="/sermons" className="lgm-nav__link">
              Sermons
            </Link>
          </div>
          <div className="lgm-nav__item">
            <Link to="/give" className="lgm-nav__link">
              Give
            </Link>
          </div>
          <div className="lgm-nav__item">
            <Link to="/contact" className="lgm-nav__link">
              Contact
            </Link>
          </div>
        </nav>

        <button 
          className="lgm-nav__waffle" 
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`lgm-nav__mobile-overlay ${isMenuOpen ? "lgm-nav__mobile-overlay--open": ""}`} onClick={() => setIsMenuOpen(false)}>
          <div
            className={`lgm-nav__mobile-drawer ${isMenuOpen ? "lgm-nav__mobile-drawer--open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="lgm-nav__mobile-title">Living Grace Ministry</span>
            <nav className="lgm-nav__mobile-links eyebrow">
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/sermons" onClick={() => setIsMenuOpen(false)}>
                Ministries
              </Link>
              <Link to="/sermons" onClick={() => setIsMenuOpen(false)}>
                Sermons
              </Link>
              <Link to="/give" onClick={() => setIsMenuOpen(false)}>
                Give
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>

            </nav>

            <div className="lgm-nav__mobile-socials">
              <a
                href="https://www.facebook.com/profile.php?id=100064729684652"
                aria-label="Facebook"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20}/>
              </a>
              <a
                href="https://www.instagram.com/livinggraceministry?igsh=MW01ZWJlZ3hkNXQwOQ=="
                aria-label="Instagram"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24}/>
              </a>
              <a
                href="https://www.youtube.com/@LivingGraceMinistry"
                aria-label="YouTube"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={24}/>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
