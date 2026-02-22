import Hero from "@/components/layout/Hero/Hero";
import Overview from "@/components/ministries/Overview/Overview";
import ActionCards from "@/components/ministries/ActionCards/ActionCards";
import heroImage from "@/assets/postgrad_hero.webp";
import img1 from "@/assets/postgrad-sg.webp";
import img2 from "@/assets/postgrad-upcoming.webp";
import img3 from "@/assets/postgrad-gc.webp";

import sectionImage from "@/assets/postgrad-side.webp";

const cards = [
  {
    id: 1,
    img: img1,
    link: "https://www.facebook.com/messages/t/1813201472888392",
    text: "Post Grad Small Groups",
  },
  {
    id: 2,
    img: img2,
    link: "https://calendar.google.com/calendar/u/0/r?cid=Y18wOGRkM2QwNDhmNDNhNDVkNDY2MGNkODAzMjcyNzEwOTAyZTMwNzhhYWU3ODk2YmUwMTk4OTY4ZTc4ZmI5YjNiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    text: "Upcoming Events",
  },
  {
    id: 3,
    img: img3,
    link: "https://www.facebook.com/messages/t/1813201472888392",
    text: "Post Grad Message Chat",
  },
];

const postGradMinistry = {
  title: "POST GRAD",
  subtitle: "Post Grad Ministry",
  description: (
    <>
      "Whatever you do, work heartily, as for the Lord and not for men" <br />{" "}
      <span className="verse-ref">Colossians 3:23</span>
    </>
  ),
  mission: (
    <>
      Early adulthood is a season of transition and becoming. We create space to
      stay <strong>rooted</strong> in faith, <strong>connected</strong> in
      community, and <strong>grounded</strong> in purpose.
    </>
  ),
  cards,
};

export default function PostGradMinistry() {
  const { title, subtitle, description, mission, cards } = postGradMinistry;

  return (
    <>
      <Hero title={title} image={heroImage} />
      <Overview
        subtitle={subtitle}
        description={description}
        mission={mission}
        image={sectionImage}
        imageAlt={"Post Grad Ministry Image"}
      />
      <ActionCards cards={cards} />
    </>
  );
}
