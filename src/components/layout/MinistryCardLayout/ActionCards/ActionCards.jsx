// src/components/layout/MinistryCardLayout/ActionCards/ActionCards.jsx

import "./ActionCards.css";

export default function ActionCards({
    cards
}) {
    
    return (
        <section className="action-cards">
            <div className="action-cards-container">
                {cards.map((card) => (
                    <a
                        key={card.id}
                        href={card.link}
                        className="action-card"
                        style={{ backgroundImage: `url(${card.img})` }}
                    >
                        <div className="action-card-content">
                            <p className="action-card-text">{card.text}</p>
                        </div>

                    </a>
                ))}
            </div>
        </section>
    );
}