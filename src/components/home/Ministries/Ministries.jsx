import React, { useRef } from "react";
import "./Ministries.css";
import MinistryCard from "./MinistryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import campusImg from "@/assets/ministry_campus.webp";
import postgradImg from "@/assets/ministry_postgrad.webp";
import postgradImg2 from "@/assets/postgradimg.webp";

export default function Ministries() {
  const swiperRef = useRef(null);

  const ministries = [
    { id: 1, title: "CHILDREN'S", image: campusImg, href: "/childrens" },
    { id: 2, title: "YOUTH GROUP", image: postgradImg, href: "/youth-group" },
    { id: 3, title: "CAMPUS", image: campusImg, href: "/campus" },
    { id: 4, title: "POST-GRAD", image: postgradImg2, href: "/post-grad" },
    { id: 5, title: "ADULT/FAMILY", image: postgradImg, href: "/adult-family" },
  ];

  return (
    <section className="ministries" id="ministries">
      <div className="ministries__inner">
        <header className="ministries__header">
          <h2 className="ministries__title">
            Find <em>your</em> place
          </h2>
          <p className="ministries__subtitle">Check out our ministries</p>
        </header>

        <div className="ministries__carousel">
          {/* Left Arrow */}
          <button
            className="ministries__arrow ministries__arrow--left"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Swiper */}
          <Swiper
            loop={true}
            spaceBetween={32}
            slidesPerView={3}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="ministries__swiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {ministries.map((ministry) => (
              <SwiperSlide key={ministry.id}>
                <MinistryCard {...ministry} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Arrow */}
          <button
            className="ministries__arrow ministries__arrow--right"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
