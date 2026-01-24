import React from "react";
import Hero from "@/components/layout/MinistryCardLayout/Hero/Hero";
import "./MinistryHeroLayout.css";

export default function MinistryHeroLayout({ title, heroImage, children }) {
  return (
    <main className="ministry-hero-layout">
      <Hero title={title} image={heroImage} />
      <section className="ministry-hero-layout__content">
        {children}
      </section>
    </main>
  );
}
