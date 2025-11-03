import React from "react";
import Hero from "@/components/Hero/Hero"; // ✅ Absolute import using vite alias "@"
// OR, if you don’t have vite alias set up yet:
// import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Hero />
    </div>
  );
}
