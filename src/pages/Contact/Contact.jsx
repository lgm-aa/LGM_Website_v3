import React from "react";
import Hero from "@/components/contact/Hero/Hero";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <Hero />
      <ContactInfo />
    </div>
  );
}
