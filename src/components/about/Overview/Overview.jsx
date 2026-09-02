import { useState } from "react";
import "./Overview.css";
import Reveal from "@/components/ui/Reveal/Reveal";
import about_overview from "@/assets/aboutus.webp";
import useLatestBulletin from "@/hooks/useLatestBulletin";
import circle from "@/assets/circle.png";

export default function Overview() {
  const [openSection, setOpenSection] = useState(null);
  const { data: bulletinData } = useLatestBulletin();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="about-overview">
      <div className="about-overview__container">
        {/* Left side - Image */}
        <Reveal className="about-overview__image-wrapper">
          <img
            src={about_overview}
            alt="Living Grace Ministry community"
            className="about-overview__image"
          />
        </Reveal>

        {/* Right side - Content */}
        <Reveal className="about-overview__content" delay={120}>
          <h2 className="about-overview__title section-h4">
            We Are a Ministry <br />
            That Lives Out Grace <br />
            <span className="circled-word">
              Practically
              <img src={circle} alt="" className="circle-overlay" />
            </span>{" "} 
            in <br />
            Ann Arbor
          </h2>

          {/* Accordion sections */}
          <div className="about-overview__accordion">
            <AccordionItem
              title="Events"
              isOpen={openSection === "events"}
              onToggle={() => toggleSection("events")}
            >
              <p>
                We host a variety of events throughout the year designed to
                build community and grow together. In the past, we've held
                events like Field Day, Abide, and our annual Christmas Party.
              </p>
              <p>
                To stay up to date on upcoming events and details, you can
                check:
              </p>
              <ul className="link-list">
                <li>
                  <a
                    href="https://www.instagram.com/livinggraceministry?igsh=MW01ZWJlZ3hkNXQwOQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/zgny5dyxv4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem
              title="Service Info"
              isOpen={openSection === "service"}
              onToggle={() => toggleSection("service")}
            >
              <p>
                Our Sunday service begins at 1:30 PM, with fellowship starting
                at 12:45 PM.
              </p>
              <p>
                Coming from campus? We give rides on Sundays. You can find ride
                details and sign-ups on our Discord:
              </p>
              <ul className="link-list">
                <li>
                  <a
                    href="https://discord.gg/zgny5dyxv4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem
              title="Core Team"
              isOpen={openSection === "team"}
              onToggle={() => toggleSection("team")}
            >
              <p>
                LGM is currently searching for a new pastor. If you have any
                questions, please contact{" "}
                <a href="mailto:livinggraceministry@gmail.com">
                  livinggraceministry@gmail.com
                </a>
                .
              </p>
              <ul className="link-list">
                <li>
                  <a href="/contact">Meet the rest of our team!</a>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem
              title="Stay Connected"
              isOpen={openSection === "connected"}
              onToggle={() => toggleSection("connected")}
            >
              <p>
                Stay connected with our community by following us on Instagram
                and Discord for updates, announcements, and event reminders.
              </p>
              <p>
                You can also join one of our small groups (Post-Grad and Campus
                Ministries) or be part of our general LGM group chat to stay in
                the loop and connected throughout the week.
              </p>
              <ul className="link-list">
                {bulletinData?.url && (
                  <li>
                    <a
                      href={bulletinData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Weekly Bulletin
                    </a>
                  </li>
                )}
              </ul>
            </AccordionItem>
          </div>
        </Reveal>
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
        <span className="accordion-item__title body-text">{title}</span>
        <span className={`accordion-item__icon ${isOpen ? "open" : ""}`}>
          +
        </span>
      </button>
      {isOpen && <div className="accordion-item__content body-text">{children}</div>}
    </div>
  );
}
