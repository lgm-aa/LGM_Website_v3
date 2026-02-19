import Hero from "@/components/layout/Hero/Hero"
import Overview from "@/components/ministries/Overview/Overview";

import heroImage from "@/assets/adult-hero.webp";
import sectionImage from "@/assets/adult-side.webp";

const adultFamilyMinistry = {
  title: "ADULT/FAMILY",
  subtitle: "Adult/Family",
  description: (
    <>
      "So we, though many, are one body in Christ, and individually members one of another." <br/> <span className="verse-ref">Romans 12:5</span>
    </>
  ),
  mission: "A community of adults, typically mid 30s and up but open to all, walking together through joy and hardship as we support one another and build God’s kingdom.",
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


