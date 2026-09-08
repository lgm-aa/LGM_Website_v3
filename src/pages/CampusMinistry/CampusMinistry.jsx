import Hero from "@/components/layout/Hero/Hero";
import Overview from "@/components/ministries/Overview/Overview";
import CampusInfo from "@/components/campus/CampusInfo/CampusInfo";
import heroImage from "@/assets/campus_hero.webp";
import sectionImage from "@/assets/campus-side.webp";

const campusMinistry = {
  title: "CAMPUS",
  subtitle: "Campus Ministry",
  description: (
    <>
      "Therefore, as you received Christ Jesus the Lord, so walk in him, rooted
      and built up in him and established in the faith, just as you were taught,
      abounding in thanksgiving." <br />{" "}
      <span className="verse-ref">Colossians 2:6–7</span>
    </>
  ),
  mission: (
    <>
      We walk with students as they grow in{" "}
      <strong>faith, community, and life</strong>,{" "}
      <strong>rooted in Christ</strong> through every season.
    </>
  ),
};

export default function CampusMinistry() {
  const { title, subtitle, description, mission } = campusMinistry;

  return (
    <>
      <Hero title={title} image={heroImage} />
      <Overview
        subtitle={subtitle}
        description={description}
        mission={mission}
        image={sectionImage}
        imageAlt={"Campus Ministry Image"}
      />
      <CampusInfo />
    </>
  );
}
