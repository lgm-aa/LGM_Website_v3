import React from "react";
import MinistryStandardLayout from "../../components/layout/MinistryCardLayout/MinistryCardLayout";
import heroImage from "@/assets/postgrad_hero.webp";
import img1 from "@/assets/people/postgrad_admin_2.jpg";

const cards = [
        { id: 1, img: img1, link: "/contact", text: "Post Grad Small Groups"},
        { id: 2, img: img1, link: "/contact", text: "Upcoming Events"},
        { id: 3, img: img1, link: "/contact", text: "Post Grad Message Chat"},
      ]


const postGradMinistry = {
  title: "POST GRAD",
  heroImage: heroImage,
  subtitle: "Post Grad Ministry",
  description: "A community for early adulthood, including grad students, working professionals, and those in between.",
  mission: (
    <>
      Early adulthood is a season of transition and becoming. We create space to stay <strong>rooted</strong> in faith, <strong>connected</strong> in community, and <strong>grounded</strong> in purpose.
    </>
  ),
  cards
};

export default function PostGradMinistry() {
  return <MinistryStandardLayout 
    {...postGradMinistry}
  />;
}