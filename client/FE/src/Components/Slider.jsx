import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardComp from "./CardComp/CardComp";


const Slider = ({filmProfiles}) => {
  return (
    <div className=" py-8">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="container mx-auto"
      >
        {filmProfiles.map((film, index) => (
          <SwiperSlide key={index}>
             <CardComp key={film.name} {...film} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
