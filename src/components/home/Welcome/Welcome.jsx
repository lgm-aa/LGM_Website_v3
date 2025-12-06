import React from "react";
import "./Welcome.css";
import Button from "@/components/ui/Button/Button";
import welcomePhoto from "@/assets/welcome.webp";

export default function Welcome() {
  return (
    <section className="welcome">
      <div className="welcome__container">
        <div className="welcome__media">
          <div className="welcome__imageWrapper">
            <img
              src={welcomePhoto}
              alt="Members of Living Grace Ministry smiling together"
              className="welcome__image"
            />
            <div className="welcome__quote">
              <p>
                "The purpose of Living Grace Ministry is to nurture genuine
                Christian discipleship through grace"
              </p>
            </div>
          </div>
        </div>

        <div className="welcome__content">
          <h2 className="welcome__title">Welcome to Living Grace Ministry</h2>
          <div className="welcome__underline" aria-hidden="true" />
          <p className="welcome__text">
            Making a community of Jesus’ disciples who love like Jesus through
            God’s grace
          </p>

          <Button
            as="a"
            href="/about"
            variant="primary"
            size="lg"
            className="welcome__button"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
