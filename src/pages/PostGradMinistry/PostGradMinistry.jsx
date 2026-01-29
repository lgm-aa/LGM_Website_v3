import Hero from "../../components/ministries/Hero/Hero"
import Overview from "../../components/ministries/Overview/Overview";
import ActionCards from "../../components/ministries/ActionCards/ActionCards";
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
  const {
    title,
    heroImage,
    subtitle,
    description,
    mission,
    cards,
  } = postGradMinistry;

    return (
        <>
            <Hero title={title} image={heroImage}/>
            <Overview subtitle={subtitle} description={description} mission={mission}/>
            <ActionCards cards={cards}/>
        </>
    );
}