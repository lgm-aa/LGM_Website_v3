import React from "react";
import "./Home.css";
import NavBar from "@/components/layout/NavBar/NavBar";
import Hero from "@/components/home/Hero/Hero";
import Community from "@/components/home/Community/Community";
import Welcome from "@/components/home/Welcome/Welcome";
import Plan from "@/components/home/Plan/Plan";
import Updates from "@/components/home/Updates/Updates";
import Ministries from "@/components/home/Ministries/Ministries";
import Footer from "@/components/layout/Footer/Footer";
import YouTubeLatest from "@/components/home/youtube";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <section id="about">
        <Community />
      </section>
      <Welcome />
      <Plan />
      <Updates />
      <Ministries />
      <YouTubeLatest channelId="UCFN3i5-SUCJctC_h5hMiBBw" />
      <Footer />
    </>
  );
}
