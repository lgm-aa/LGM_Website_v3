import Givecontent from "@/components/give/Give";
import Hero from "@/components/layout/Hero/Hero";
import giveHeroImage from "@/assets/lgm_building.webp";

export default function Donate() {
  return (
    <div className="give-page">
      <Hero title="GIVE" image={giveHeroImage} />
      <Givecontent />
    </div>
  );
}
