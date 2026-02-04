import Hero from "@/components/ministries/Hero/Hero";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import contactHeroImage from "@/assets/lgm_easter.webp"; 

import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <Hero title="CONTACT" image={contactHeroImage} />
      <ContactInfo />
    </div>
  );
}
