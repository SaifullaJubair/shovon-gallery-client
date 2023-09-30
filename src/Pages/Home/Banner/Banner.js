import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import "./Banner.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Carousel } from "flowbite-react";

const Banner = () => {
  return (
    // <div className="">
    //   <Swiper
    //     spaceBetween={30}
    //     effect={"fade"}
    //     centeredSlides={true}
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     loop={true}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     navigation={true}
    //     modules={[EffectFade, Autoplay, Pagination, Navigation]}
    //     className="mySwiper"
    //   >
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1695717/pexels-photo-1695717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1961772/pexels-photo-1961772.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //   </Swiper>
    // </div>
    <div className="h-[650px] w-full mx-auto  bg-white">
      <Carousel>
        <img
          src="https://cdn.shopify.com/s/files/1/0317/1421/products/Saddle_Chair_DawsonAndCo_TimothyOulton3.jpg?v=1651539635"
          alt="..."
          className="w-full h-full"
        />
        <img
          src="https://img.freepik.com/free-photo/home-indoor-design-concept_23-2148811458.jpg?w=1380&t=st=1680968742~exp=1680969342~hmac=b6fd366916607df72d1393f6b4a9da07b8d165df96458197b1118d7274cb2987"
          alt="..."
          className="w-full h-full"
        />
        <img
          src="https://images.pexels.com/photos/1961772/pexels-photo-1961772.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="..."
          className="w-full h-full"
        />
      </Carousel>
    </div>
  );
};

export default Banner;
