import Sermoncontent from "@/components/sermons/Video/Video";
import Hero from "@/components/layout/Hero/Hero";
import Button from "@/components/ui/Button/Button";
import sermonsHeroImage from "@/assets/sanctuary.webp";

export default function Sermon() {
  return (
    <div className="sermon-page">
      <Hero
        title="SERMONS"
        image={sermonsHeroImage}
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
