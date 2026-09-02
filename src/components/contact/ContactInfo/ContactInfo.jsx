import { useState } from "react";
import "./ContactInfo.css";

import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";

import youth_director from "@/assets/people/youth_director.jpg";
import praise_leader from "@/assets/people/praise_leader.jpg";
import praise_apprentice from "@/assets/people/praise_apprentice.jpg";
import campus_admin_ohn from "@/assets/people/campus_admin_ohn.webp";
import campus_admin_vanessa from "@/assets/people/campus_admin_vanessa.webp";
import campus_admin_ryan from "@/assets/people/campus_admin_ryan.jpg";
import postgrad_admin_2 from "@/assets/people/postgrad_admin_2.jpg";
import finance_chair from "@/assets/people/finance_chair.jpg";
import filler from "@/assets/lgm_logo.webp";

export default function ContactInfo() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Currently Searching",
      role: "Pastor",
      email: "livinggraceministry@gmail.com",
      image: filler,
    },
    {
      id: 2,
      name: "Andrew Choi",
      role: "Worship Leader",
      email: "andrewsungwoochoi@gmail.com",
      image: praise_leader,
    },
    {
      id: 3,
      name: "Daniel Cha",
      role: "Assistant Worship Leader",
      email: "dchaa@umich.edu",
      image: praise_apprentice,
    },
    {
      id: 4,
      name: "Sarah Chung",
      role: "Youth Ministry Director",
      email: "sarah201671@gmail.com",
      image: youth_director,
    },
    {
      id: 5,
      name: "Ohn Yoo",
      role: "Campus Ministry Admin",
      email: "ohn@umich.edu",
      image: campus_admin_ohn,
    },
    {
      id: 6,
      name: "Vanessa Kim",
      role: "Campus Ministry Admin",
      email: "vnessk@umich.edu",
      image: campus_admin_vanessa,
    },
    {
      id: 7,
      name: "Ryan Hong",
      role: "Campus Ministry Admin",
      email: "ryanhong@umich.edu",
      image: campus_admin_ryan,
    },
    {
      id: 8,
      name: "Yubin Choi",
      role: "Post-Grad Ministry Admin",
      email: "ychoi1276@gmail.com",
      image: postgrad_admin_2,
    },
    {
      id: 9,
      name: "Colin Janak",
      role: "Core Council Administrator",
      email: "colinjanak2015@gmail.com",
      image: filler,
    },
    {
      id: 10,
      name: "Jason Um",
      role: "Finance Chair",
      email: "livinggraceministry@gmail.com",
      image: finance_chair,
    },
  ];

  return (
    <section className="contact-info">
      <div className="contact-info__container">
        <Reveal as="h2" className="contact-info__header section-h4">Core Council Team</Reveal>
        <Reveal className="contact-info__grid" delay={80}>
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card__image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card__image"
                />
              </div>
              <h3 className="team-card__name body-text">{member.name}</h3>
              <p className="team-card__role body-text">{member.role}</p>
              <button
                onClick={() => handleCopyEmail(member.email, member.id)}
                className="team-card__email"
              >
                {copiedId === member.id ? "Copied!" : member.email}
              </button>
            </div>
          ))}
        </Reveal>
        <div className="contact-info__cta-section">
          <p className="contact-info__cta-text body-text">Have other comments or questions?</p>
          <Button variant="secondary" href="mailto:livinggraceministry@gmail.com" className="body-text">
            Contact LGM
          </Button>
        </div>
      </div>
    </section>
  );
}
