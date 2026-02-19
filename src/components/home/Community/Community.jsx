import React from "react";
import "./Community.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

import img1 from "@/assets/community1.webp";
import img2 from "@/assets/community2.webp";
import img3 from "@/assets/community3.webp";
import img4 from "@/assets/community4.webp";
import img6 from "@/assets/community6.webp";
import img7 from "@/assets/community7.webp";
import img8 from "@/assets/community8.webp";
import img9 from "@/assets/community9.webp";
import img10 from "@/assets/community10.webp";
import img11 from "@/assets/community11.webp";

import { useCommunityCarousel } from "@/hooks/useCommunityCarousel";

const photos = [img1, img11, img2, img3, img4, img6, img7, img8, img9, img10];
const communityPhotos = [...photos, ...photos];

export default function Community() {
  const { swiperRef, handlePrev, handleNext, handleUserTouch } =
    useCommunityCarousel();

  return (
    <section className="community">
      <div className="community__inner">
        <h2 className="section-h2">Our Community</h2>
      </div>

      <div className="community__rail">
        <button
          type="button"
          className="community__nav community__nav--prev"
          onClick={handlePrev}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          type="button"
          className="community__nav community__nav--next"
          onClick={handleNext}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          freeModeMomentum={false}
          spaceBetween={24}
          slidesPerView={"auto"}
          speed={14000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onTouchStart={handleUserTouch}
          onTouchEnd={handleUserTouch}
          className="community__swiper"
        >
          {communityPhotos.map((src, idx) => (
            <SwiperSlide key={idx} className="community__slide">
              <div className="community__card">
                <img src={src} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
