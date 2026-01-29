import Hero from "../../components/ministries/Hero/Hero"
import Overview from "../../components/ministries/Overview/Overview";
import Image from "../../components/ministries/Image/Image";

import heroImage from "@/assets/youth_group.webp";
import sectionImage from "@/assets/ministry_campus.webp";

const youthMinistry = {
  title: "YOUTH",
  subtitle: "Youth Group",
  description: "We’re a group of high school and middle school students (grades 6-12) who are passionate about having fun and learning about what it means to be a devoted follower of Christ who loves like Jesus, for life!",
  mission: (
    <>
      Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity. <br/> <br/> 1 Timothy 4:12
    </>
  )
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
        <Overview subtitle={subtitle} description={description} mission={mission}/>
        <Image image={sectionImage} imageAlt="Youth group"/>
      </>
  );
}
