// src/components/ministries/ActionCards/ActionCards.jsx

import Card from "@/components/ui/Card/Card";
import CardCarousel from "@/components/ui/CardCarousel/CardCarousel";
import "./ActionCards.css";

export default function ActionCards({ cards }) {
  return (
    <section className="action-cards">
      {/* Divider — shared across both layouts */}
      <div className="action-cards__divider" aria-hidden="true">
        <span className="action-cards__divider-line" />
        <span className="body-text">Click on the cards to see more</span>
        <span className="action-cards__divider-line" />
      </div>

      {/* Desktop: overlay design */}
      <div className="action-cards-container">
        {cards.map((card) => (
          <a
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="action-card"
            style={{ backgroundImage: `url(${card.img})` }}
          >
            <div className="action-card-content">
              <p className="action-card-text">{card.text}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile: swipeable CardCarousel with Card components (image + navy label below) */}
      <div className="action-cards-mobile">
        <CardCarousel
          items={cards}
          renderCard={(card) => (
            <Card
              title={card.text}
              image={card.img}
              href={card.link}
              external={true}
            />
          )}
        />
      </div>
    </section>
  );
}
