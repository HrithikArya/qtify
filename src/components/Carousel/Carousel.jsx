import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Carousel.css";

import LeftNav from "../Navigation/LeftNav";
import RightNav from "../Navigation/RightNav";

const Carousel = ({ data, renderComponent }) => {
  const swiperRef = useRef(null);

  return (
    <div className="carouselWrapper">
      <LeftNav onClick={() => swiperRef.current?.slidePrev()} />
      <RightNav onClick={() => swiperRef.current?.slideNext()} />

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            {renderComponent(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
