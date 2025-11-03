import React from "react";
import lgm_easter from "@/assets/lgm_easter.jpg";

export default function Hero() {
  return (
    <section
      style={{
        position: "fixed",
        inset: 0, // top:0 right:0 bottom:0 left:0
        backgroundImage: `url(${lgm_easter})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
