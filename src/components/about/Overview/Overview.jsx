import { useState } from "react";
import "./Overview.css";
import about_overview from "@/assets/about_overview.webp";

export default function Overview() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="about-overview">
      <div className="about-overview__container">
        {/* Left side - Image */}
        <div className="about-overview__image-wrapper">
          <img
            src={about_overview}
            alt="Living Grace Ministry community"
            className="about-overview__image"
          />
        </div>

        {/* Right side - Content */}
        <div className="about-overview__content">
          <h2 className="about-overview__title">
            We Are a Ministry That Lives Out Grace{" "}
            <span className="about-overview__emphasis">Practically</span> in Ann Arbor
          </h2>

          {/* Accordion sections */}
          <div className="about-overview__accordion">
            <AccordionItem
              title="Events"
              isOpen={openSection === "events"}
              onToggle={() => toggleSection("events")}
            >
              <p>We host a variety of events throughout the year designed to build community and grow together. In the past, we've held events like Field Day, Abide, and our annual Christmas Party.</p>
              <p>To stay up to date on upcoming events and details, you can check:</p>
              <ul className="link-list">
                <li><a href="https://calendar.google.com/calendar/u/0?cid=bGdtYW5uYXJib3JAZ21haWwuY29t" target="_blank" rel="noopener noreferrer">LGM Calendar</a></li>
                <li><a href="https://www.instagram.com/livinggraceministry?igsh=MW01ZWJlZ3hkNXQwOQ==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=100064729684652" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              </ul>
            </AccordionItem>

            <AccordionItem
              title="Service Info"
              isOpen={openSection === "service"}
              onToggle={() => toggleSection("service")}
            >
              <p>Our Sunday service begins at 1:30 PM, with fellowship starting at 12:45 PM.</p>
              <p>For those coming from campus at @umich, we recommend taking the Blake Transit bus. Additional transportation details can be found in our Google Doc:</p>
              <p>→ [Link to Google Doc]</p>
            </AccordionItem>

            <AccordionItem
              title="Core Team"
              isOpen={openSection === "team"}
              onToggle={() => toggleSection("team")}
            >
              <p>LGM is currently searching for a new pastor. If you have any questions, please contact <a href="mailto:livinggraceministry@gmail.com">livinggraceministry@gmail.com</a>.</p>
              <p>Meet the rest of our team!</p>
            </AccordionItem>

            <AccordionItem
              title="Stay Connected"
              isOpen={openSection === "connected"}
              onToggle={() => toggleSection("connected")}
            >
              <p>Stay connected with our community by following us on Instagram and Facebook for updates, announcements, and event reminders.</p>
              <p>You can also join one of our small groups (Post-Grad and Campus Ministries) or be part of our general LGM group chat to stay in the loop and connected throughout the week.</p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="accordion-item">
      <button
        className="accordion-item__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-item__title">{title}</span>
        <span className={`accordion-item__icon ${isOpen ? "open" : ""}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="accordion-item__content">
          {children}
        </div>
      )}
    </div>
  );
}
