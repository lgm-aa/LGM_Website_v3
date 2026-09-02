import "./Give.css";
import Reveal from "@/components/ui/Reveal/Reveal";
import venmoIcon from "@/assets/icons/imgvenmo.png";
import zelleIcon from "@/assets/icons/imgzelle.png";
import moneyIcon from "@/assets/icons/imgmoney.png";

export default function Give() {
  return (
    <main className="give">

      <section className="give-quote">
        <Reveal as="blockquote">
          <p className="section-h3">
            “Each one must give as he has decided in his<br />
            heart, not reluctantly or under compulsion,<br />
            for God loves a cheerful giver.”
          </p>
          <span className="body-text">2 Corinthians 9:7</span>
        </Reveal>
      </section>

      <section className="give-ways">
        <Reveal className="give-ways__inner">
          <h2 className="give-ways__title section-h2">Ways to Give</h2>

          <div className="give-ways__grid">
            <div className="give-ways__item">
              <img src={venmoIcon} alt="" className="give-ways__icon" />
              <span className="give-ways__label eyebrow">Venmo</span>
              <p className="give-ways__detail body-text">
                <a
                  href="https://account.venmo.com/u/LGMAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="give-link"
                >
                  @LGMAA
                </a>
              </p>
            </div>

            <div className="give-ways__item">
              <img src={moneyIcon} alt="" className="give-ways__icon" />
              <span className="give-ways__label eyebrow">In person</span>
              <p className="give-ways__detail body-text">
                Give to the welcoming team
              </p>
            </div>

            <div className="give-ways__item">
              <img src={zelleIcon} alt="" className="give-ways__icon" />
              <span className="give-ways__label eyebrow">Zelle</span>
              <p className="give-ways__detail body-text">
                livinggraceministry@gmail.com
              </p>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
