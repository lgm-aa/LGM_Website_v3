import React from "react";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import Community from "../components/Community/Community";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Community />
    </>
  );
}
