// src/components/ministries/Overview/Overview.jsx

import "./Overview.css";
import Button from "@/components/ui/Button/Button";

export default function Overview({
    subtitle,
    description,
    mission,
    image
}) {
    return (
        <section className="overview">
            <div className="overview__container">
                <div className="overview__left">
                    <p className="overview__subtitle eyebrow">{subtitle}</p>
                    <p className="overview__desc body-text">{description}</p>
                    <p className="overview__mission-text section-h3">{mission}</p>
                    <Button variant="tertiary" href="/contact" className="body-text">
                        Contact Us
                    </Button>
                </div>
                <div className="overview__right">
                    <img
                        className="overview__image"
                        src={image}
                        alt=""
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    )
}