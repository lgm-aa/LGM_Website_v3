import React, { useRef, useEffect } from "react";
import "./Community.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

import img1 from "@/assets/community1.jpg";
import img2 from "@/assets/community2.jpg";
import img3 from "@/assets/community3.jpg";
import img4 from "@/assets/community4.jpg";

const photos = [img1, img2, img3, img4];
const communityPhotos = [...photos, ...photos]; // duplicate for longer belt

export default function Community() {
  const swiperRef = useRef(null);
  const idleTimerRef = useRef(null);

  const interruptAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return null;

    // stop autoplay timer
    if (swiper.autoplay) {
      swiper.autoplay.stop();
    }

    // force-cancel the current long transition
    swiper.setTransition(0);
    swiper.animating = false;

    return swiper;
  };

  const scheduleAutoplayRestart = () => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      const sw = swiperRef.current;
      if (sw && sw.autoplay) {
        sw.autoplay.start();
      }
    }, 5_000); // 30 seconds
  };

  const handlePrev = () => {
    const swiper = interruptAutoplay();
    if (!swiper) return;

    swiper.slidePrev(500); // fast, responsive click
    scheduleAutoplayRestart(); // resume belt after idle
  };

  const handleNext = () => {
    const swiper = interruptAutoplay();
    if (!swiper) return;

    swiper.slideNext(500);
    scheduleAutoplayRestart();
  };

  // optional: treat touch/drag as interaction too
  const handleUserTouch = () => {
    const swiper = interruptAutoplay();
    if (!swiper) return;
    scheduleAutoplayRestart();
  };

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
        {/* custom arrows */}
        <button
          type="button"
          className="community__nav community__nav--prev"
          onClick={handlePrev}
          aria-label="Previous community photo"
        >
          ‹
        </button>
        <button
          type="button"
          className="community__nav community__nav--next"
          onClick={handleNext}
          aria-label="Next community photo"
        >
          ›
        </button>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          freeModeMomentum={false}
          spaceBetween={24}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }, // 4 cards in “static” mode
          }}
          speed={14000} // slow continuous belt
          autoplay={{
            delay: 0,
            disableOnInteraction: false, // we control it ourselves
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
