import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/lgm_logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["About", "Ministries", "Sermons", "Donate"];

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Living Grace Ministry"
            style={{
              height: "2rem",
              width: "2rem",
              borderRadius: "0.375rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "0.25rem",
            }}
          />
          <span className="text-white font-medium tracking-wide">
            Living Grace Ministry
          </span>
        </a>

        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="navbar-mobile md:hidden text-white">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block px-4 py-3"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
