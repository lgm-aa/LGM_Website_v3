import "./give.css";
import backgroundImage from "@/assets/ministry_campus.webp";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

export default function Give() {
  return (
    <main className="give">
      <section
        className="give-hero"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="give-hero__overlay" />

        <div className="give-hero__content">
          <h1 className="give-hero__title">GIVE</h1>

        </div>

        <ScrollIndicator />

        
      </section>

      <section className="give-quote">
        <blockquote>
          <p className="section-h3">
            "Each one must give as he has decided in his<br />
            heart, not reluctantly or under compulsion,<br />
            for God loves a cheerful giver."
          </p>
          <span className="body-text">2 Corinthians 9:7</span>
        </blockquote>
      </section>

      <section className="give-ways">
  <div className="give-ways__inner">
    <h2 className="give-ways__title section-h2">Ways to Give</h2>

    <div className="give-ways__grid">
      <div className="give-ways__item body-text">
        <div className="give-ways__icon" />
        <p>
          Venmo to{" "}
          <a
            href="https://account.venmo.com/u/LGMAA"
            target="_blank"
            rel="noopener noreferrer"
            className="give-link"
          >
            LGMAA
          </a>
        </p>

      </div>

      <div className="give-ways__item body-text">
        <div className="give-ways__icon" />
        <p>Give in person to the welcoming team</p>
      </div>

      <div className="give-ways__item body-text">
        <div className="give-ways__icon" />
        <p>
          Zelle to <br />
          livinggraceministry@gmail.com
        </p>
      </div>
    </div>

    <p className="give-ways__footer body-text">
      Thank you for considering a financial gift. Any of the payment <br />
      methods above can be used to make a donation.
    </p>
  </div>
</section>


    </main>
  );
}
