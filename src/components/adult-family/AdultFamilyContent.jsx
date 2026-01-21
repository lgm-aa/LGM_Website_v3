import PageHero from "@/components/layout/PageHero/PageHero";
import adultImage from "@/assets/ministry_campus.webp";
import "./AdultFamilyContent.css";

export default function AdultFamilyContent() {
  return (
    <>
      <PageHero title="ADULTS & FAMILY" backgroundImage={adultImage} />

      <section className="adult-intro">
        <div className="adult-intro__top">
          <div className="adult-intro__verseBlock">
            <p className="adult-intro__verse">
              As for me and my household, we will serve the LORD.
            </p>
            <span className="adult-intro__ref">Joshua 24:15</span>
          </div>

          <div className="adult-intro__description">
            <p>
              Our adult and family ministry exists to help individuals, couples,
              and families grow deeper in their relationship with Christ and
              build Christ-centered homes rooted in faith, community, and love.
            </p>
          </div>
        </div>

        <div className="adult-intro__image" />
      </section>
    </>
  );
}
