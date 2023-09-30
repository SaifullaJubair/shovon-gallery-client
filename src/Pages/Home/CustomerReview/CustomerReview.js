import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./CustomerReview.css";

// import required modules
import { EffectCards } from "swiper/modules";
import ReviewSlide from "./ReviewSlide";
const CustomerReview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
      <div class=" text-center  md-w-md my-auto">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Don't just take our word for it...
        </h2>

        <p class=" text-gray-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
          veritatis illo placeat harum porro optio fugit a culpa sunt id!
        </p>
      </div>
      <div className="">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewSlide></ReviewSlide>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReview;
