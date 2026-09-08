// src/components/layout/Hero/Hero.jsx
import "./Hero.css";

export default function Hero({
  title,
  image,
  action, // optional CTA slot
}) {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">{title}</h1>

        {action && <div className="hero__action">{action}</div>}

        <figure className="hero__figure">
          <img src={image} alt="" className="hero__image" loading="eager" />
        </figure>
      </div>
    </section>
  );
}
