import "./WhoWeAre.css";
import Reveal from "@/components/ui/Reveal/Reveal";

export default function WhoWeAre() {
  return (
    <section className="who-we-are">
      <div className="who-we-are__container">
        <Reveal as="h2" className="who-we-are__title section-h2">Who We Are</Reveal>

        <Reveal className="who-we-are__cards" delay={100}>
          {/* Christ-Centered */}
          <div className="who-we-are__card">
            <h3 className="who-we-are__card-title section-h4">Christ-Centered</h3>
            <p className="who-we-are__card-text body-text">
              Living Grace Ministry is a United Methodist Church rooted in the gospel of Jesus Christ. Our desire is to live out the radical grace of Jesus, a grace that welcomes anyone and transforms lives through love, forgiveness, and compassion.
            </p>
          </div>

          {/* Mission-Focused */}
          <div className="who-we-are__card">
            <h3 className="who-we-are__card-title section-h4">Mission-Focused</h3>
            <p className="who-we-are__card-text body-text">
              Formerly the English ministry of the Korean United Methodist Church of Ann Arbor, we became independent July 2023. Still deeply connected in partnership and purpose, we are committed to outreach, discipleship, and equipping leaders to build God's kingdom.
            </p>
          </div>

          {/* Open to All */}
          <div className="who-we-are__card">
            <h3 className="who-we-are__card-title section-h4">Open to All</h3>
            <p className="who-we-are__card-text body-text">
              LGM is a community made up of people from different backgrounds and walks of life. You don&rsquo;t need to be Korean or come from a particular background to belong here. We warmly welcome everyone to join us for worship, fellowship, and life together. At LGM, you are welcome.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
