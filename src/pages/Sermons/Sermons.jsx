import Sermoncontent from "@/components/sermons/Video/Video";
import Hero from "@/components/layout/Hero/Hero";
import Button from "@/components/ui/Button/Button";
import contactHeroImage from "@/assets/lgm_building.webp";

export default function Sermon() {
  return (
    <div className="sermon-page">
      <Hero
        title="SERMONS"
        image={contactHeroImage}
        action={
          <Button
            variant="primary"
            href="https://www.youtube.com/@LivingGraceMinistry"
            newTab
          >
            ▶ Visit Our YouTube
          </Button>
        }
      />
      <Sermoncontent />
    </div>
  );
}
