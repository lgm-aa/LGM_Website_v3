import Hero from "@/components/layout/Hero/Hero"
import Overview from "@/components/ministries/Overview/Overview";

import heroImage from "@/assets/youth_group.webp";
import sectionImage from "@/assets/youthgroup-side.webp";

const youthMinistry = {
  title: "YOUTH",
  subtitle: "Youth Group",
  description: (
    <>
      Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity. <br/> <br/> 1 Timothy 4:12
    </>
  ),
  mission: "Empowering students to become devoted followers of Christ through faith, community, and intentional discipleship (Grades 6–12).",
};

export default function YouthGroupMinistry() {
    const {
    title,
    subtitle,
    description,
    mission,
  } = youthMinistry;

  return (
      <>
        <Hero title={title} image={heroImage}/>
        <Overview subtitle={subtitle} description={description} mission={mission} image={sectionImage} imageAlt={'Youth Group Image'}/>
      </>
  );
}
