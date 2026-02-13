import Hero from "@/components/layout/Hero/Hero"
import Overview from "@/components/ministries/Overview/Overview";
import ActionCards from "@/components/ministries/ActionCards/ActionCards";
import heroImage from "@/assets/postgrad_hero.webp";
import img1 from "@/assets/postgrad-sg.webp";
import img2 from "@/assets/postgrad-upcoming.webp";
import img3 from "@/assets/community5.webp";

import sectionImage from "@/assets/postgrad-side.webp";

const cards = [
        { id: 1, img: img1, link: "/contact", text: "Post Grad Small Groups"},
        { id: 2, img: img2, link: "/contact", text: "Upcoming Events"},
        { id: 3, img: img3, link: "/contact", text: "Post Grad Message Chat"},
      ]


const postGradMinistry = {
  title: "POST GRAD",
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
  const {
    title,
    subtitle,
    description,
    mission,
    cards,
  } = postGradMinistry;

    return (
        <>
            <Hero title={title} image={heroImage}/>
            <Overview subtitle={subtitle} description={description} mission={mission} image={sectionImage} imageAlt={'Post Grad Ministry Image'}/>
            <ActionCards cards={cards}/>
        </>
    );
}