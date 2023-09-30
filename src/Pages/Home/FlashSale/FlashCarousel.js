import { Carousel } from "flowbite-react";
import React from "react";
import { FaExchangeAlt, FaEye, FaHeart } from "react-icons/fa";

const FlashCarousel = () => {
  return (
    <div>
      <div className="h-52 p-4 w-60 mx-auto  bg-white">
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
            src="https://img.freepik.com/free-psd/armchair-pillow_176382-870.jpg?size=626&ext=jpg&ga=GA1.2.520351952.1680967563&semt=sph"
            alt="..."
            className="w-full h-full"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default FlashCarousel;
