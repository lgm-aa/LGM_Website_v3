// src/components/layout/MinistryCardLayout/MinistryCardLayout.jsx

import React from "react";
import Hero from "./Hero/Hero"
import Overview from "./Overview/Overview";
import ActionCards from "./ActionCards/ActionCards";

export default function MinistryPageLayout({
    title,
    heroImage,
    subtitle,
    description,
    mission,
    cards
}) {
    return (
        <>
            <Hero title={title} image={heroImage}/>
            <Overview subtitle={subtitle} description={description} mission={mission}/>
            <ActionCards cards={cards}/>
        </>
    );
}