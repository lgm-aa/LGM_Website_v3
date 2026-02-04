import Hero from "../../components/ministries/Hero/Hero"
import Overview from "../../components/ministries/Overview/Overview";

import heroImage from "@/assets/ministry_campus.webp";
import sectionImage from "@/assets/ministry_campus.webp";

const childrensMinistry = {
  title: "CHILDREN",
  subtitle: "Children Ministry",
  description: "Our children’s ministry is a joyful community where kids (grades K-5) gather together to learn about God’s love, grow in faith, and build lasting friendships.",
  mission: (
    <>
      Children are a heritage from the LORD, offspring a reward from him. <br/> <br/> Psalms 127:3
    </>
  )
};


export default function ChildrensMinistry() {
  const {
    title,
    subtitle,
    description,
    mission,
  } = childrensMinistry;

  return (
    <>
      <Hero title={title} image={heroImage}/>
      <Overview subtitle={subtitle} description={description} mission={mission} image={sectionImage} imageAlt={'Children Ministry Image'}/>
    </>
  );
}
