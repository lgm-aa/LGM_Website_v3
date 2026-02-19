// src/components/layout/Hero/Hero.jsx

import "./Hero.css";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

export default function Hero({
  title,
  image,
  action, // optional CTA slot
}) {
  return (
    <section
      id="hero"
      className="hero"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>

        {action && (
          <div className="hero__action hero__action--below">
            {action}
          </div>
        )}
      </div>

      <ScrollIndicator className="scroll-indicator--lower" />
    </section>
  );
}
