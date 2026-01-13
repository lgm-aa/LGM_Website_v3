import "./Quote.css";

export default function Quote() {
  return (
    <section className="about-quote">
      <div className="about-quote__content">
        <p className="about-quote__text">
          The purpose of Living Grace Ministry is to nurture{" "}
          <span className="about-quote__emphasis">genuine</span> Christian
          discipleship through <span className="about-quote__grace">grace</span>.
        </p>
        <div className="about-quote__divider" />
      </div>
    </section>
  );
}
