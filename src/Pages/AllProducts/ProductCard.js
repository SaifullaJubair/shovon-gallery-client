import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsStarFill } from "react-icons/bs";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";

const ProductCard = ({ product }) => {
  const [wishList, setWishList] = useState(false);
  const [reviews, setReviews] = useState([]);

  // const [singleProduct, setSingleProduct] = useState({});
  useEffect(() => {
    fetch(`https://shovon-gallery-server.vercel.app/all-review/${product?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [product]);

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
      starArray.push(<FaStar key={`full-${i}`} className="text-yellow-300" />);
    }
    //This loop iterates numberOfFullStars times and adds FaStar elements with a yellow color to starArray. Each star has a unique key based on its index.
    // Add fractional star
    if (fractionalPart > 0) {
      starArray.push(
        <div key="fractional" className="relative">
          <div style={{ maxWidth: "100%" }}>
            <FaStar
              className="text-yellow-300"
              style={{ width: starWidth, overflow: "hidden", zIndex: 1 }}
            />
          </div>
          <FaRegStar className="text-yellow-300 absolute top-0 left-0" />
        </div>
      );
    }
    //If there's a fractional part greater than 0, this block adds a fractional star. It creates a div element with a maximum width of 100% and places an overflowing FaStar inside it. The FaRegStar is added as an empty star to cover the overflow and create the effect of a partially filled star.

    // Add empty stars
    const emptyStars = 5 - numberOfFullStars - (fractionalPart > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-300" />
      );
    }
    //This loop adds the remaining empty stars to starArray. The total number of stars is 5, so we subtract the number of full stars and the fractional part (if present) to calculate the number of empty stars. Empty stars are represented by FaRegStar components.
    return starArray;
  };

  const averageRating = calculateAverageRating(reviews);
  const { user } = useContext(AuthContext);

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

  const handleWishList = (product) => {
    setWishList((prevState) => !prevState);

    const wishItemInfo = {
      // UserInfo
      productId: product?._id,
      userId: user?.uid,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
    };
    // console.log(wishItemInfo);

    if (wishList) {
      return fetch(
        `https://shovon-gallery-server.vercel.app/wishlist/${product?._id}?email=${user?.email}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) setWishList(false);
        })
        .catch((err) => console.log(err));
    } else {
      return fetch("https://shovon-gallery-server.vercel.app/add-wishlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(wishItemInfo),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  // checking if the wishlist exist or not
  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://shovon-gallery-server.vercel.app/wishlist/${product?._id}?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.userEmail === user.email) {
          setWishList(true);
        } else setWishList(false);
      });
  }, [product?._id, user?.email]);
  // console.log(product);
  return (
    <div>
      <div className="group relative block overflow-hidden  hover:shadow-lg ">
        <button
          className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5  transition  text-orange-500"
          onClick={() => handleWishList(product)}
        >
          {wishList ? (
            <>
              <Tooltip
                content="Remove Wishlist"
                className="text-xs text-red-400 inline"
                style="light"
              >
                <FaHeart></FaHeart>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip
                content="Add Wishlist"
                className="text-xs text-red-400 inline"
                style="light"
              >
                <FaRegHeart className="font-bold" />
              </Tooltip>
            </>
          )}
        </button>

        <Link to={`/singleproduct/${product?._id}`}>
          <img
            src={primary_img}
            alt=""
            className="lg:h-64 md:h-64 h-96 w-full transition duration-500 group-hover:scale-105 "
          />

          <div className="relative border border-gray-100 bg-white ">
            <h3 className="mt-4  text-gray-700 mx-4 font-semibold">
              {product_name}
            </h3>
            <h3 className="mt-4  text-gray-500 mx-4 ">{category}</h3>

            <p className="mt-2 font-semibold text-lg mx-2  text-orange-500 flex items-center ">
              <span className="text-xl">
                <TbCurrencyTaka></TbCurrencyTaka>
              </span>
              {price}
            </p>
            <div className="flex flex-wrap m-2.5 space-x-2">
              <div className="flex items-center  text-gray-600">
                {renderStars(averageRating)}
              </div>
              <span className="text-gray-600">
                {averageRating.toFixed(1)} ({reviews.length})
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
