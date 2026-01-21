import PageHero from "@/components/layout/PageHero/PageHero";
import youthImage from "@/assets/youth_group.webp";
import "./YouthGroupContent.css";

export default function YouthGroupContent() {
  return (
    <>
      <PageHero title="YOUTH" backgroundImage={youthImage} />

      <section className="youth-intro">
        <div className="youth-intro__grid">
          <div className="youth-intro__verse">
            <p className="youth-intro__quote">
              Let no one despise you for your <strong>youth</strong>, but set the
              believers an example in <strong>speech</strong>, in{" "}
              <strong>conduct</strong>, in <strong>love</strong>, in{" "}
              <strong>faith</strong>, in <strong>purity</strong>.
            </p>
            <span className="youth-intro__reference">
              1 Timothy 4:12
            </span>
          </div>

          <div className="youth-intro__description">
            <p>
              We’re a group of high school and middle school students (grades
              6–12) who are passionate about having fun and learning about what
              it means to be a devoted follower of Christ who loves like Jesus,
              for life!
            </p>
          </div>
        </div>

        <div className="youth-intro__image" />
      </section>
    </>
  );
}
