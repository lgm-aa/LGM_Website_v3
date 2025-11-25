import React, { useEffect } from "react";
import "./Community.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

import img1 from "@/assets/community1.webp";
import img2 from "@/assets/community2.webp";
import img3 from "@/assets/community3.webp";
import img4 from "@/assets/community4.webp";
import { useCommunityCarousel } from "@/hooks/useCommunityCarousel";

const photos = [img1, img2, img3, img4];
const communityPhotos = [...photos, ...photos];

export default function Community() {
  const { swiperRef, handlePrev, handleNext, handleUserTouch } =
    useCommunityCarousel();

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <section className="community">
      <div className="community__inner">
        <h2 className="community__title">OUR COMMUNITY</h2>
      </div>

      <div className="community__rail">
        <button
          type="button"
          className="community__nav community__nav--prev"
          onClick={handlePrev}
        >
          ‹
        </button>

        <button
          type="button"
          className="community__nav community__nav--next"
          onClick={handleNext}
        >
          ›
        </button>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          freeModeMomentum={false}
          spaceBetween={24}
          slidesPerView={"auto"} // << FIXED
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
