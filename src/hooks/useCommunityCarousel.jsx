import { useRef } from "react";

export const useCommunityCarousel = () => {
  const swiperRef = useRef(null);
  const idleTimerRef = useRef(null);

  const interruptAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return null;

    if (swiper.autoplay) swiper.autoplay.stop();

    swiper.setTransition(0);
    swiper.animating = false;

    return swiper;
  };

  const scheduleAutoplayRestart = () => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      const sw = swiperRef.current;
      if (sw && sw.autoplay) sw.autoplay.start();
    }, 5000); // 5 sec
  };

  const handlePrev = () => {
    const swiper = interruptAutoplay();
    if (!swiper) return;

    swiper.slidePrev(500);
    scheduleAutoplayRestart();
  };

  const handleNext = () => {
    const swiper = interruptAutoplay();
    if (!swiper) return;

    swiper.slideNext(500);
    scheduleAutoplayRestart();
  };

  const handleUserTouch = () => {
    const swiper = interruptAutoplay();
    if (!swiper) return;

    scheduleAutoplayRestart();
  };

  return {
    swiperRef,
    handlePrev,
    handleNext,
    handleUserTouch,
  };
};