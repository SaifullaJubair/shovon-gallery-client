import React from "react";
import { useState, useEffect } from "react";
import FlashCarousel from "../Home/FlashSale/FlashCarousel";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";

const Suggest = ({ suggestProduct, singleProduct }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/all-review/${singleProduct?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [singleProduct]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  const renderStars = (averageRating) => {
    const starArray = []; //This line initializes an empty array called starArray where we will store the JSX elements representing the stars.
    const numberOfFullStars = Math.floor(averageRating);
    //This line calculates the number of full stars based on the averageRating. Math.floor() is used to round down the averageRating to the nearest whole number, giving us the count of full stars.
    const fractionalPart = averageRating - numberOfFullStars;
    //This line calculates the fractional part of the averageRating by subtracting the number of full stars from the averageRating. This fractional part represents how much of the last star should be filled.
    const starWidth = `${(fractionalPart * 100).toFixed(0)}%`;

    // This line calculates the width of the fractional star as a percentage. It multiplies the fractionalPart by 100 to get a percentage and uses toFixed(0) to round the percentage to the nearest whole number.

    // Add full stars
    for (let i = 0; i < numberOfFullStars; i++) {
      starArray.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    //This loop iterates numberOfFullStars times and adds FaStar elements with a yellow color to starArray. Each star has a unique key based on its index.
    // Add fractional star
    if (fractionalPart > 0) {
      starArray.push(
        <div key="fractional" className="relative">
          <div style={{ maxWidth: "100%" }}>
            <FaStar
              className="text-yellow-400"
              style={{ width: starWidth, overflow: "hidden", zIndex: 1 }}
            />
          </div>
          <FaRegStar className="text-yellow-400 absolute top-0 left-0" />
        </div>
      );
    }
    //If there's a fractional part greater than 0, this block adds a fractional star. It creates a div element with a maximum width of 100% and places an overflowing FaStar inside it. The FaRegStar is added as an empty star to cover the overflow and create the effect of a partially filled star.

    // Add empty stars
    const emptyStars = 5 - numberOfFullStars - (fractionalPart > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
      );
    }
    //This loop adds the remaining empty stars to starArray. The total number of stars is 5, so we subtract the number of full stars and the fractional part (if present) to calculate the number of empty stars. Empty stars are represented by FaRegStar components.
    return starArray;
  };

  const averageRating = calculateAverageRating(reviews);
  return (
    <div>
      {suggestProduct.map((product) => (
        <div
          className="lg:w-[300px] md:w-[300px] w-[280px] my-4 mx-auto "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          key={product._id}
        >
          <div className=" max-w-sm shadow-md hover:shadow-2xl ">
            {isHovering ? (
              <div>
                <FlashCarousel product={product}></FlashCarousel>
              </div>
            ) : (
              <div className=" h-60">
                <img
                  className=" w-full h-full"
                  src={product?.primary_img}
                  alt=""
                />
              </div>
            )}
            <div className="px-5 pb-5">
              <h5 className="text-gray-400 text-sm font-semibold py-1 ">
                {product?.category}
              </h5>
              <h2 className="text-lg font-semibold  text-gray-700 dark:text-white ">
                {product?.product_heading?.slice(0, 45) + "..."}
              </h2>

              <div className="flex my-1.5 flex-wrap text-xs space-x-2">
                <div className="flex items-center  text-gray-600">
                  {renderStars(averageRating)}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length})
                </span>
              </div>

              <div className="flex items-center ">
                <p className="font-semibold text-xl text-secondary">
                  {product?.price}
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
      ))}
    </div>
  );
};

export default Suggest;
