import Hero from "@/components/layout/Hero/Hero"
import Overview from "../../components/ministries/Overview/Overview";
import ActionCards from "../../components/ministries/ActionCards/ActionCards";
import heroImage from "@/assets/campus_hero.webp";
import img1 from "@/assets/campus-sg.webp";
import img2 from "@/assets/campus-upcoming.webp";
import img3 from "@/assets/campus-ride.webp";
import sectionImage from "@/assets/campus-side.webp";

const cards = [
        { id: 1, img: img1, link: "https://docs.google.com/forms/d/e/1FAIpQLSeSwAQ-r4aV1pYTZ-ALQvM0CF4n5e4W5B7SfD__8IBKrD4LmA/viewform", text: "Campus Small Groups"},
        { id: 2, img: img2, link: "https://calendar.google.com/calendar/u/0/r?cid=Y18wOGRkM2QwNDhmNDNhNDVkNDY2MGNkODAzMjcyNzEwOTAyZTMwNzhhYWU3ODk2YmUwMTk4OTY4ZTc4ZmI5YjNiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20 ", text: "Upcoming Events"},
        { id: 3, img: img3, link: "https://linktr.ee/livinggraceministry?utm_source=linktree_profile_share&ltsid=a0b56597-b014-4494-8919-dd97399adf93", text: "Campus Ride Info"},
      ]


const campusMinistry = {
  title: "CAMPUS",
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
  const {
    title,
    subtitle,
    description,
    mission,
    cards,
  } = campusMinistry;

    return (
        <>
            <Hero title={title} image={heroImage}/>
            <Overview subtitle={subtitle} description={description} mission={mission} image={sectionImage} imageAlt={'Campus Ministry Image'}/>
            <ActionCards cards={cards}/>
        </>
    );
}