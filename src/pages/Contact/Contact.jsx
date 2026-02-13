import Hero from "@/components/layout/Hero/Hero";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import contactHeroImage from "@/assets/contactpage.webp"; 

import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <Hero title="CONTACT" image={contactHeroImage} />
      <ContactInfo />
    </div>
  );
}
