import React from "react";
import { useState } from "react";
import { BsCart2, BsFillBarChartFill } from "react-icons/bs";
import { FaExchangeAlt, FaEye, FaHeart, FaStar } from "react-icons/fa";
import FlashCarousel from "../FlashCarousel";
import { Link } from "react-router-dom";

const FlashCard = ({ product }) => {
  const [isHovering, setIsHovering] = useState(false);
  const {
    _id,
    product_uid,
    product_name,
    category,
    product_heading,
    box_content,
    primary_color,
    primary_img,
    price,
    product_status,
    available_color,
    user_email,
    user_image,
    user_name,
    product_highlight,
    details,
    feature_img1,
    feature_img2,
  } = product;

  return (
    <div
      className="w-[280px] mx-auto "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className=" max-w-sm shadow-md hover:shadow-2xl ">
        {isHovering ? (
          <div>
            <FlashCarousel product={product}></FlashCarousel>
          </div>
        ) : (
          <div className=" h-60">
            <img className=" w-full h-full" src={primary_img} alt="" />
          </div>
        )}
        <div className="px-5 pb-5">
          <h5 className="text-gray-400 text-sm font-semibold py-1 ">
            {category}
          </h5>
          <h2 className="text-lg font-semibold  text-gray-700 dark:text-white ">
            {product_heading.slice(0, 45) + "..."}
          </h2>

          <div className="flex items-center mt-2.5 mb-3 text-md text-yellow-300">
            <FaStar></FaStar>
            <FaStar></FaStar>
            <FaStar></FaStar>
            <FaStar></FaStar>
            <FaStar></FaStar>
            <span className="bg-blue-100 text-gray-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              5.0
            </span>
          </div>

          <div className="flex items-center ">
            <p className="font-semibold text-xl text-secondary">
              {price}
              <span className="font-bold text-xl">৳</span>
            </p>
          </div>
          <Link to={`/singleproduct/${product?._id}`}>
            <div className="bg-[#eaefeb] text-[#5B9982] hover:bg-[#5B9982] hover:text-[#eaefeb]  rounded-sm text-center mt-4 font-semibold">
              <section className="flex items-center justify-center gap-2">
                <button className=" py-2">Vew Details</button>{" "}
                <BsCart2></BsCart2>
              </section>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
