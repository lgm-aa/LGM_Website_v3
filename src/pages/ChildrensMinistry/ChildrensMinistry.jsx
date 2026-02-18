import Hero from "@/components/layout/Hero/Hero"
import Overview from "@/components/ministries/Overview/Overview";

import heroImage from "@/assets/children-hero.webp";
import sectionImage from "@/assets/children-side.webp";

const childrensMinistry = {
  title: "CHILDREN",
  subtitle: "Children Ministry",
  description: (
    <>
      Children are a heritage from the LORD, offspring a reward from him. <br/> <br/> Psalms 127:3
    </>
  ),
  mission: "Learning about God’s love, growing in faith, and building friendships in a joyful environment together (Grades K–5).",
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
