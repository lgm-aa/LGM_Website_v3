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
              <p>Content about events will go here.</p>
            </AccordionItem>

            <AccordionItem
              title="Service Info"
              isOpen={openSection === "service"}
              onToggle={() => toggleSection("service")}
            >
              <p>Content about service information will go here.</p>
            </AccordionItem>

            <AccordionItem
              title="Core Team"
              isOpen={openSection === "team"}
              onToggle={() => toggleSection("team")}
            >
              <p>Content about the core team will go here.</p>
            </AccordionItem>

            <AccordionItem
              title="Stay Connected"
              isOpen={openSection === "connected"}
              onToggle={() => toggleSection("connected")}
            >
              <p>Content about staying connected will go here.</p>
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
