// src/components/ministries/Overview/Overview.jsx

import "./Overview.css";

export default function Overview({
    subtitle,
    description,
    mission
}) {
    return (
        <section className="overview">
            <div className="overview__container">
                <div className="overview__left">
                    <p className="overview__subtitle">{subtitle}</p>
                    <p className="overview__desc">{description}</p>
                </div>
                <div className="overview__right">
                    <p className="overview__mission-text">{mission}</p>
                    <a href="/contact" className="overview__contact-button">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    )
}