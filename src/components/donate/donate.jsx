import "./donate.css";
import backgroundImage from "@/assets/ministry_campus.webp";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

export default function Donate() {
  return (
    <main className="donate">
      <section
        className="donate-hero"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="donate-hero__overlay" />

        <div className="donate-hero__content">
          <h1 className="donate-hero__title">GIVE</h1>

        </div>

        <ScrollIndicator />

        <div className="donate-hero__wave" aria-hidden="true">
          <svg
            className="donate-hero__wave-svg"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
          >
            <path
              className="donate-hero__wave-path"
              d="
                M0,64 
                C120,96 240,128 360,128
                C540,128 600,64 780,64
                C960,64 1080,120 1260,120
                C1350,120 1395,110 1440,104
                L1440,160 L0,160 Z
              "
            />
          </svg>
        </div>
      </section>

      <section className="donate-quote">
        <blockquote>
          <p>
            “Each one must give as he has decided in his heart, not reluctantly or
            under compulsion, for God loves a cheerful giver.”
          </p>
          <span>2 Corinthians 9:7</span>
        </blockquote>
      </section>

      <section className="donate-ways">
  <div className="donate-ways__inner">
    <h2 className="donate-ways__title">Ways to Give</h2>

    <div className="donate-ways__grid">
      <div className="donate-ways__item">
        <div className="donate-ways__icon" />
        <p>
          Venmo to{" "}
          <a
            href="https://account.venmo.com/u/LGMAA"
            target="_blank"
            rel="noopener noreferrer"
            className="donate-link"
          >
            LGMAA
          </a>
        </p>

      </div>

      <div className="donate-ways__item">
        <div className="donate-ways__icon" />
        <p>Give in person to the welcoming team</p>
      </div>

      <div className="donate-ways__item">
        <div className="donate-ways__icon" />
        <p>
          Zelle to <br />
          livinggraceministry@gmail.com
        </p>
      </div>
    </div>

    <p className="donate-ways__footer">
      Thank you for considering a financial gift. Any of the payment methods
      above can be used to make a donation.
    </p>
  </div>
</section>


    </main>
  );
}
