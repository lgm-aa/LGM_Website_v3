// src/components/layout/MinistryCardLayout/Hero/Hero.jsx

import "./Hero.css";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

export default function Hero({
    title,
    image
}) {
    return(
        <section
                className="ministry-card-hero"
                style={{ backgroundImage: `url(${image})` }}
        >
            <div className="ministry-card-hero__overlay" />

            <div className="ministry-card-hero__content">
                <h1 className="ministry-card-hero__title">{title}</h1>
            </div>
            <ScrollIndicator />
        </section>
    )
}