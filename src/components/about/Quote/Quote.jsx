import "./Quote.css";

export default function Quote() {
  return (
    <section className="about-quote">
      <div className="about-quote__content">
        <p className="about-quote__text">
          The purpose of Living Grace<br/>
          Ministry is to nurture{" "}<br/>
          <span className="about-quote__emphasis">genuine</span> Christian<br/>
          discipleship through <span className="about-quote__grace">grace</span>.
        </p>
        <div className="about-quote__divider" />
      </div>
    </section>
  );
}
