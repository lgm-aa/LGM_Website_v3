// src/components/ministries/Overview/Overview.jsx

import "./Overview.css";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";

export default function Overview({
    subtitle,
    description,
    mission,
    image
}) {
    return (
        <section className="overview">
            <div className="overview__container">
                <Reveal className="overview__left">
                    <p className="overview__subtitle eyebrow">{subtitle}</p>
                    <p className="overview__desc body-text">{description}</p>
                    <p className="overview__mission-text section-h3">{mission}</p>
                    <Button variant="tertiary" href="/contact" className="body-text">
                        Contact Us
                    </Button>
                </Reveal>
                <Reveal className="overview__right" delay={120}>
                    <img
                        className="overview__image"
                        src={image}
                        alt=""
                        loading="lazy"
                    />
                </Reveal>
            </div>
        </section>
    )
}
