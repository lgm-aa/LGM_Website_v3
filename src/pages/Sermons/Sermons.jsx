import Sermoncontent from "@/components/sermons/Video/Video";
import Hero from "@/components/layout/Hero/Hero";
import Button from "@/components/ui/Button/Button";
import sermonsHeroImage from "@/assets/sanctuary.webp";
import YouTubeLogo from "@/assets/yt_icon_red_digital.png";

import "./Sermons.css";

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
            <div className="yt-btn-content">
              <img 
                src={YouTubeLogo}
                alt="Youtube Logo"
                className="yt-btn-icon"
              />
              <span>Visit Our YouTube</span>
            </div>
          </Button>
        }
      />
      <Sermoncontent />
    </div>
  );
}
