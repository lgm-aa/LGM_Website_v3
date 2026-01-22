import "./PageHero.css";

export default function PageHero({ title, backgroundImage }) {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-hero__overlay" />

      <div className="page-hero__content">
        <h1 className="page-hero__title">{title}</h1>
      </div>

      <div className="page-hero__wave" aria-hidden="true">
        <svg
          className="page-hero__wave-svg"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            className="page-hero__wave-path"
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
  );
}
