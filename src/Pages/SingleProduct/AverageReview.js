import React from "react";
import { BsStar } from "react-icons/bs";
import { FaRegStar, FaSquare, FaStar } from "react-icons/fa";

const AverageReview = ({ reviews }) => {
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  // const averageRating = calculateAverageRating(reviews);

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

  const calculatePercentage = (total, count) => {
    return count > 0 ? ((count / total) * 100).toFixed(0) + "%" : "0%";
  };

  const renderRatingBars = (totalReviews, reviewsCount) => {
    return (
      <div className="flex flex-col mt-4">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviewsCount[star] || 0;
          const filledStars = Array.from({ length: star }, (_, index) => (
            <FaStar key={`filled-${index}`} className="text-yellow-300" />
          ));
          const emptyStars = Array.from({ length: 5 - star }, (_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-yellow-300" />
          ));
          return (
            <div key={star} className="flex items-center space-x-1">
              <span className="flex items-center mx-1 text-sm">
                {" "}
                {filledStars}
                {emptyStars}
              </span>
              <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-200">
                <div
                  className="bg-yellow-300 h-4"
                  style={{ width: calculatePercentage(totalReviews, count) }}
                ></div>
              </div>
              <span className=" text-gray-600 w-16 text-sm text-right">
                <span className="flex items-center ms-1">
                  {count}, {calculatePercentage(totalReviews, count)}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const totalReviews = reviews.length;
  const reviewsCount = reviews.reduce((count, review) => {
    const rating = review.rating;
    count[rating] = (count[rating] || 0) + 1;
    return count;
  }, {});

  const averageRating = calculateAverageRating(reviews);
  return (
    <div>
      <div className="my-6">
        <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-50 text-gray-800">
          <div className="flex flex-col w-full">
            <h2 className="text-3xl font-semibold text-center">
              Customer reviews
            </h2>
            <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
              <div className="flex items-center">
                {renderStars(averageRating)}
              </div>
              <span className="text-gray-600">
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>
            <p className="text-sm text-gray-600">{reviews.length} Ratings</p>
            {/* <div className="flex flex-col mt-4">
              <div className="flex items-center space-x-1">
                <span className="flex-shrink-0 w-12 text-sm">5 star</span>
                <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                  <div className="bg-yellow-300 h-4 w-5/6"></div>
                </div>
                <span className="flex-shrink-0 w-12 text-sm text-right">
                  83
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="flex-shrink-0 w-12 text-sm">4 star</span>
                <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                  <div className="bg-yellow-300 h-4 w-4/6"></div>
                </div>
                <span className="flex-shrink-0 w-12 text-sm text-right">
                  67
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="flex-shrink-0 w-12 text-sm">3 star</span>
                <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                  <div className="bg-yellow-300 h-4 w-3/6"></div>
                </div>
                <span className="flex-shrink-0 w-12 text-sm text-right">
                  50
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="flex-shrink-0 w-12 text-sm">2 star</span>
                <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                  <div className="bg-yellow-300 h-4 w-2/6"></div>
                </div>
                <span className="flex-shrink-0 w-12 text-sm text-right">
                  33
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="flex-shrink-0 w-12 text-sm">1 star</span>
                <div className="flex-1 h-4 overflow-hidden rounded-sm bg-gray-300">
                  <div className="bg-yellow-300 h-4 w-1/6"></div>
                </div>
                <span className="flex-shrink-0 w-12 text-sm text-right">
                  17
                </span>
              </div>
            </div> */}
            {renderRatingBars(totalReviews, reviewsCount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageReview;
