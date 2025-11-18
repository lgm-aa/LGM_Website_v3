import React from "react";
import "./Ministries.css";
import MinistryCard from "./MinistryCard";
import Button from "@/components/ui/Button/Button";

import campusImg from "@/assets/ministry_campus.webp";
import postgradImg from "@/assets/ministry_postgrad.webp";
// import familyImg from "@/assets/ministry_family.jpg";

export default function Ministries() {
  return (
    <section className="ministries">
      <div className="ministries__inner">
        <header className="ministries__header">
          <h2 className="ministries__title">
            Find <em>your</em> place
          </h2>
          <p className="ministries__subtitle">Check out our ministries</p>
        </header>

        <div className="ministries__grid">
          <MinistryCard title="CAMPUS" image={campusImg} href="#campus" />
          <MinistryCard title="POST-GRAD" image={postgradImg} href="#postgrad" />
          <MinistryCard title="FAMILY" image={campusImg} href="#family" />
        </div>

        <div className="ministries__cta">
          <Button variant="outline" size="lg" className="ministries-button">
            See all ministries
          </Button>
        </div>
      </div>
    </section>
  );
}
