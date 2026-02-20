import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./CardCarousel.css";

export default function CardCarousel({
  items,
  renderCard,
  dividerText,
  spaceBetween = 24,
}) {
  const swiperRef = useRef(null);

  return (
    <div className="card-carousel">
      {dividerText && (
        <div className="card-carousel__divider" aria-hidden="true">
          <span className="card-carousel__divider-line" />
          <span className="body-text">{dividerText}</span>
          <span className="card-carousel__divider-line" />
        </div>
      )}

      <div className="card-carousel__wrapper">
        <button
          className="card-carousel__arrow card-carousel__arrow--left"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
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

        <Swiper
          loop={true}
          spaceBetween={spaceBetween}
          slidesPerView={3}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="card-carousel__swiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>

        <button
          className="card-carousel__arrow card-carousel__arrow--right"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
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
  );
}
