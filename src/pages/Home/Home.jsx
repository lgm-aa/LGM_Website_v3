import React from "react";
import "./Home.css";
import Hero from "@/components/home/Hero/Hero";
import Community from "@/components/home/Community/Community";
import Welcome from "@/components/home/Welcome/Welcome";
import Plan from "@/components/home/Plan/Plan";
import Ministries from "@/components/home/Ministries/Ministries";
import Updates from "@/components/home/Updates/Updates";

export default function Home() {
  return (
    <>
      <Hero />
      <Community />
      <Welcome />
      <Plan />
      <Ministries />
      <Updates />
    </>
  );
}
