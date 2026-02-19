import Givecontent from "@/components/give/Give";
import Hero from "@/components/layout/Hero/Hero";
import contactHeroImage from "@/assets/give.webp"; 


export default function Donate() {
  return (
    <div className="give-page">
      <Hero title="GIVE" image={contactHeroImage} />
      <Givecontent />
    </div>
  );
}