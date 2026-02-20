import "./ActionCards.css";
import Card from "@/components/ui/Card/Card";
import CardCarousel from "@/components/ui/CardCarousel/CardCarousel";

export default function ActionCards({ cards }) {
  return (
    <section className="action-cards">
      <CardCarousel
        items={cards}
        dividerText="Click on the cards to see more"
        renderCard={(card) => (
          <Card
            title={card.text}
            image={card.img}
            href={card.link}
            external={true}
          />
        )}
      />
    </section>
  );
}
