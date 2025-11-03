import React from "react";
import lgm_easter from "@/assets/lgm_easter.jpg";

export default function Hero() {
  return (
    <main>
      <section
        style={{
          position: "fixed",
          inset: 0, // top:0 right:0 bottom:0 left:0
          backgroundImage: `url(${lgm_easter})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            He is Risen
          </h1>
          <p style={{ fontSize: "1.25rem" }}>Living Grace Ministry</p>
        </div>
      </section>
    </main>
  );
}
