import "./PageHero.css";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

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

      <ScrollIndicator className="scroll-indicator--lower" />
    </section>
  );
}
