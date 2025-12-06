import React, { useState } from "react";
import "./Ministries.css";
import MinistryCard from "./MinistryCard";

import campusImg from "@/assets/ministry_campus.webp";
import postgradImg from "@/assets/ministry_postgrad.webp";

export default function Ministries() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const familyImg = campusImg;
  
  const ministries = [
    { id: 1, title: "CHILDREN'S", image: campusImg, href: "/childrens" },
    { id: 2, title: "YOUTH GROUP", image: postgradImg, href: "/youth-group" },
    { id: 3, title: "CAMPUS", image: familyImg, href: "/campus" },
    { id: 4, title: "POST-GRAD", image: campusImg, href: "/post-grad" },
    { id: 5, title: "ADULT/FAMILY", image: postgradImg, href: "/adult-family" },
  ];

  const cardsPerView = 3;
  
  const getVisibleCards = () => {
    const visibleCards = [];
    
    for (let i = 0; i < cardsPerView; i++) {
      const actualIndex = (currentIndex + i) % ministries.length;
      visibleCards.push(ministries[actualIndex]);
    }
    
    return visibleCards;
  };

  const handleSlide = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ministries.length);
    } else {
      setCurrentIndex((prevIndex) => 
        prevIndex - 1 < 0 ? ministries.length - 1 : prevIndex - 1
      );
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const nextSlide = () => handleSlide('next');
  const prevSlide = () => handleSlide('prev');

  const visibleCards = getVisibleCards();

  return (
    <section className="ministries" id="ministries">
      <div className="ministries__inner">
        <header className="ministries__header">
          <h2 className="ministries__title">
            Find <em>your</em> place
          </h2>
          <p className="ministries__subtitle">Check out our ministries</p>
        </header>

        <div className="ministries__carousel-container">
          <div className="ministries__grid-wrapper">
            <button 
              className="ministries__arrow ministries__arrow--left"
              onClick={prevSlide}
              disabled={isAnimating}
              aria-label="Previous ministries"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={`ministries__grid ${isAnimating ? 'ministries__grid--animating' : ''}`}>
              {visibleCards.map((ministry) => (
                <MinistryCard 
                  key={`${ministry.id}-${currentIndex}`}
                  title={ministry.title}
                  image={ministry.image}
                  href={ministry.href}
                />
              ))}
            </div>

            <button 
              className="ministries__arrow ministries__arrow--right"
              onClick={nextSlide}
              disabled={isAnimating}
              aria-label="Next ministries"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}