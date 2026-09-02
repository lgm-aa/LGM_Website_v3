import React from "react";
import "./Welcome.css";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import welcomePhoto from "@/assets/welcome.webp";

export default function Welcome() {
  return (
    <section className="welcome">
      <div className="welcome__container">
        <Reveal className="welcome__imageWrapper">
          <img
            src={welcomePhoto}
            alt="Members of Living Grace Ministry smiling together"
            className="welcome__image"
          />
        </Reveal>

        <div className="welcome__quote">
          <p className="body-text">
            The purpose of Living Grace Ministry is to nurture genuine
            Christian discipleship through grace
          </p>
        </div>

        <Reveal className="welcome__content" delay={120}>
          <h2 className="section-h4">Welcome to Living Grace Ministry</h2>
          <div className="welcome__underline" aria-hidden="true" />
          <div className="welcome__text-container">
            <p className="body-text">
              Making a community of Jesus’ disciples who love like Jesus through
              God’s grace
            </p>
          </div>

          <Button
            variant="secondary"
            href="/about"
            className="welcome__button body-text"
          >
            Learn More
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
