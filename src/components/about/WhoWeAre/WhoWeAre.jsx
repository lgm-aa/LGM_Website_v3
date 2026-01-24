import "./WhoWeAre.css";
import aboutWhoweare from "@/assets/about-whoweare.webp";

export default function WhoWeAre() {
  return (
    <section
      className="who-we-are"
      style={{ backgroundImage: `url(${aboutWhoweare})` }}
    >
      <div className="who-we-are__overlay" />

      <div className="who-we-are__container">
        <h2 className="who-we-are__title">Who We Are</h2>

        <div className="who-we-are__cards">
          {/* Card 1: Christ-Centered */}
          <div className="who-we-are__card">
            <h3 className="who-we-are__card-title">Christ-Centered</h3>
            <p className="who-we-are__card-text">
              Living Grace Ministry is a United Methodist Church rooted in the gospel of Jesus Christ. Our desire is to live out the radical grace of Jesus, a grace that welcomes anyone and transforms lives through love, forgiveness, and compassion.
            </p>
          </div>

          {/* Card 2: Mission-Focused */}
          <div className="who-we-are__card">
            <h3 className="who-we-are__card-title">Mission-Focused</h3>
            <p className="who-we-are__card-text">
              Formerly the English ministry of the Korean United Methodist Church of Ann Arbor, we became independent July 2023. Still deeply connected in partnership and purpose, we are committed to outreach, discipleship, and equipping leaders to build God's kingdom.
            </p>
          </div>

          {/* Card 3: Open to all */}
          <div className="who-we-are__card">
            <h3 className="who-we-are__card-title">Open to all</h3>
            <p className="who-we-are__card-text">
              LGM is not all Korean, and we do not expect anyone to fit a certain background or story. We welcome anyone to join us for worship, fellowship, and community life. At LGM, all are welcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
