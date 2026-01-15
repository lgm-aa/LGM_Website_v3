import React from "react";
import MinistryCardLayout from "../../components/layout/MinistryCardLayout/MinistryCardLayout";
import heroImage from "@/assets/campus_hero.webp";
import img1 from "@/assets/community1.webp";
import img2 from "@/assets/community2.webp";
import img3 from "@/assets/community3.webp";

const cards = [
        { id: 1, img: img1, link: "/contact", text: "Campus Small Groups"},
        { id: 2, img: img2, link: "/contact", text: "Upcoming Events"},
        { id: 3, img: img3, link: "/contact", text: "Campus Ride Info"},
      ]


const campusMinistry = {
  title: "CAMPUS",
  heroImage: heroImage,
  subtitle: "Campus Ministry",
  description: "A Christ-centered campus community walking together through college life at the University of Michigan.",
  mission: (
    <>
      <strong>Identity is formed. Purpose is discovered.</strong> We walk with students as they grow in faith, community, and life rooted in Christ.
    </>
  ),
  cards: cards
};



export default function CampusMinistry() {
  return <MinistryCardLayout 
    {...campusMinistry}
  />;
}