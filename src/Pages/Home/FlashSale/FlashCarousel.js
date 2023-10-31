import { Carousel } from "flowbite-react";
import React from "react";
import { FaExchangeAlt, FaEye, FaHeart } from "react-icons/fa";

const FlashCarousel = ({ product }) => {
  return (
    <div>
      <div className="h-60  w-full mx-auto  bg-white">
        <Carousel>
          <img src={product.primary_img} alt="..." className="w-full h-full" />
          <img
            src={product?.feature_img1}
            alt="..."
            className="w-full h-full"
          />
          <img
            src={product?.feature_img2}
            alt="..."
            className="w-full h-full"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default FlashCarousel;
