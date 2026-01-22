import PageHero from "@/components/layout/PageHero/PageHero";
import childrenImage from "@/assets/ministry_campus.webp";
import "./ChildrensContent.css";

export default function ChildrensContent() {
  return (
    <>
      <PageHero title="CHILDREN" backgroundImage={childrenImage} />

      <section className="children-intro">
        <div className="children-intro__grid">
          <div className="children-intro__left">
            <h2 className="children-intro__label">Children Ministry</h2>
            <p className="children-intro__blurb">
              Our children’s ministry is a joyful community where kids (grades
              K-5) gather together to learn about God’s love, grow in faith, and
              build lasting friendships.
            </p>
          </div>

          <div className="children-intro__right">
            <p className="children-intro__verse">
              Children are a heritage from the LORD, offspring a reward from him
            </p>

            <div className="children-intro__rightRow">
              <span className="children-intro__ref">Psalms 127:3</span>

              <a className="children-intro__cta" href="/contact">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="children-intro__image" />
      </section>
    </>
  );
}
