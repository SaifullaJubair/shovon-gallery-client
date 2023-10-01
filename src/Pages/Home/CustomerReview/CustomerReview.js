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
  const slideContent = [
    {
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      text: "So happy with my hair and make up and the hair lasted until the next day photos also. Miss you and thank you again so much for everything.",
      client: "Jacqui ",
      corporation: "Hong Kong, China",
    },
    {
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      text: "Thank you again for your help in making me look glamorous and glad you liked the gift! All the best to you",
      client: "Jessica",
      corporation: "Sydney, Australia",
    },
    {
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      text: "Thank you so much for everything. Not only are you excellent at your job but I really enjoyed meeting you.",
      client: "Katie",
      corporation: "Austin, USA",
    },
    {
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      text: "Thank you so much! My mother, sister and I had such a nice day getting ready and we were all thrilled with our hair and makeup!!",
      client: "Ivana",
      corporation: "Moscow, Russia",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
      <div class="   md-w-md my-auto px-2">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-4">
          Don't just take our word for it...
        </h2>

        <p class=" text-gray-700 pb-6">
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
          {slideContent.map((el, i) => (
            <SwiperSlide key={i}>
              <ReviewSlide
                client={el.client}
                corporation={el.corporation}
                img={el.img}
                text={el.text}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReview;
