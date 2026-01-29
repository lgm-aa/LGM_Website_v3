import Hero from "../../components/ministries/Hero/Hero"
import Overview from "../../components/ministries/Overview/Overview";
import Image from "../../components/ministries/Image/Image";

import heroImage from "@/assets/youth_group.webp";
import sectionImage from "@/assets/ministry_campus.webp";

const adultFamilyMinistry = {
  title: "ADULT/FAMILY",
  subtitle: "Adult/Family",
  description: "Through every stage of life, we need a community to journey with us. As we navigate life, we find that God desires to create a family that is not specific to one’s immediate family, but is bound together by the love of Christ. Life can be complicated and difficult at times—God never intended us to go through it alone. LGM Adult and Family Ministry strives to be a place where we can support, encourage, love, laugh, and cry with each other as we earnestly seek to build God’s kingdom within us and in this greater world. LGM Adult and Family Ministry is for mid-30s and up generally, but no one’s counting! Whether you are single, married, divorced, with kids or without, you are welcome to join us.",
  mission: (
    <>
      [Insert quote or mission]
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
        <Overview subtitle={subtitle} description={description} mission={mission}/>
        <Image image={sectionImage} imageAlt="Children ministry"/>
      </>
  );
}
