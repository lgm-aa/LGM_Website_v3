import React from "react";
import "./Home.css";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import Community from "../components/Community/Community";
import Welcome from "../components/Welcome/Welcome";
import Plan from "../components/Plan/Plan";
import Updates from "../components/Updates/Updates";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <section id="about" className="section-about">
        <Community />
      </section>
      <Welcome />
      <Plan />
      <Updates />
      <Footer />
    </>
  );
}
