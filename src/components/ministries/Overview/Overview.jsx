// src/components/ministries/Overview/Overview.jsx

import "./Overview.css";

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
                    <a href="/contact" className="overview__contact-button body-text">
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