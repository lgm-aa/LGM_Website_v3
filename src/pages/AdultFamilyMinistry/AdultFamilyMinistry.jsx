import Hero from "../../components/ministries/Hero/Hero"
import Overview from "../../components/ministries/Overview/Overview";

import heroImage from "@/assets/adult-hero.webp";
import sectionImage from "@/assets/adult-side.webp";

const adultFamilyMinistry = {
  title: "ADULT/FAMILY",
  subtitle: "Adult/Family",
  description: "Through every stage of life, God invites us into a Christ-centered family where we walk together through both joy and difficulty. LGM Adult and Family Ministry is a welcoming community, generally for mid-30s and up, but open to all, where we support one another and seek to build God’s kingdom together.",
  mission: (
    <>
      So we, though many, are one body in Christ, and individually members one of another. <br/> <br/> Romans 12:5
    </>
  )
};

export default function AdultFamilyMinistry() {
  const {
    title,
    subtitle,
    description,
    mission,
  } = adultFamilyMinistry;

  return (
      <>
        <Hero title={title} image={heroImage}/>
        <Overview subtitle={subtitle} description={description} mission={mission} image={sectionImage} imageAlt={'Adult/Family Ministry Image'}/>
      </>
  );
}


