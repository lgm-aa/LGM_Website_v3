import Sermoncontent from "@/components/sermons/Video/Video";
import Hero from "@/components/layout/Hero/Hero";
import contactHeroImage from "@/assets/lgm_building.webp"; 


export default function Sermon() {
  return (
    <div className="sermon-page">
      <Hero title="SERMONS" image={contactHeroImage} />
      <Sermoncontent />
    </div>
  );
}