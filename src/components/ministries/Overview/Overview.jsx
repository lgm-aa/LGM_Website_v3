// src/components/ministries/Overview/Overview.jsx

import "./Overview.css";

import image from "@/assets/ministry_campus.webp";

export default function Overview({
    subtitle,
    description,
    mission
}) {
    return (
        <section className="overview">
            <div className="overview__container">
                <div className="overview__left">
                    <p className="overview__subtitle eyebrow">{subtitle}</p>
                    <p className="overview__desc body-text">{description}</p>
                    <p className="overview__mission-text section-h3">{mission}</p>
                    <a href="/contact" className="overview__contact-button">
                        Contact Us
                    </a>
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