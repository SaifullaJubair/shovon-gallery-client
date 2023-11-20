import { Button, Tooltip } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductHighlightSection = ({ singleProduct }) => {
  const [wishList, setWishList] = useState(false);
  const [cart, setCart] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [reviews, setReviews] = useState([]);
  const [qna, setQnA] = useState([]);

  const { product_heading, primary_color, price, available_color } =
    singleProduct;

  const handleWishList = (singleProduct) => {
    setWishList((prevState) => !prevState);

    const wishItemInfo = {
      // UserInfo
      productId: singleProduct?._id,
      userId: user?.uid,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
    };
    // console.log(wishItemInfo);

    if (wishList) {
      return fetch(
        `https://shovon-gallery-server.vercel.app/wishlist/${singleProduct?._id}?email=${user?.email}`,
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
      `https://shovon-gallery-server.vercel.app/wishlist/${singleProduct?._id}?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.userEmail === user.email) {
          setWishList(true);
        } else setWishList(false);
      });
  }, [singleProduct?._id, user?.email]);

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    // console.log(colorName);
  };
  const handleAddToCart = () => {
    if (!user?.uid) {
      // User is not logged in, show a toast notification
      toast.error("Please log in to add the product to your cart", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const cartData = {
      productId: singleProduct?._id,
      userId: user?.uid,
      userEmail: user?.email,
      userName: user?.displayName,
      selectedColor: selectedColor,
      quantity: quantity,
    };
    // console.log("cartData:", cartData);
    fetch(
      `https://shovon-gallery-server.vercel.app/cart/${singleProduct?._id}?email=${user?.email}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (
          data &&
          data.productId === singleProduct?._id &&
          data.userEmail === user?.email
        ) {
          // Product is already in the cart, show a toast notification
          toast.error("This product is already in your cart", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Product is not in the cart, add it to the cart collection
          fetch("https://shovon-gallery-server.vercel.app/add-cart", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(cartData),
          })
            .then((res) => res.json())
            .then((data) => {
              // Product added to cart successfully, show a success toast notification
              toast.success("Product added to cart successfully", {
                position: toast.POSITION.TOP_CENTER,
              });
              // Set cart to true after adding the product to the cart
              setCart(true);
            })
            .catch((error) => {
              console.error("Error adding product to cart:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking if product is in cart:", error);
      });
  };

  // quantity
  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value);
    // Ensure the input value is a positive integer or set it to 1 if invalid
    setQuantity(Math.max(parseInt(value, 10) || 1, 1));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    fetch(
      `https://shovon-gallery-server.vercel.app/all-qna/${singleProduct._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQnA(data);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [singleProduct]);

  useEffect(() => {
    fetch(
      `https://shovon-gallery-server.vercel.app/all-review/${singleProduct?._id}`
    )
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
      <h2 className="font-semibold lg:text-2xl md:text-2xl sm:text-xl text:lg  text-gray-800 max-w-screen-md">
        {product_heading}
      </h2>
      {/* review and ans section  */}
      <div className="flex justify-between items-center">
        <section className=" flex items-center gap-1 mt-4 mb-6 ">
          <div className="flex flex-wrap text-xs space-x-2">
            <div className="flex items-center  text-gray-600">
              {renderStars(averageRating)}
            </div>
            <span className="text-gray-600">{averageRating.toFixed(1)} </span>
          </div>
          <p className="text-xs">
            <span className=" text-blue-400  font-semibold">
              {" "}
              ({reviews.length}) Ratings
            </span>{" "}
            |
            <span className=" text-blue-400  font-semibold">
              {" "}
              {qna.length} QnA
            </span>
          </p>
        </section>

        <div className="">
          <button
            onClick={() => handleWishList(singleProduct)}
            type="button"
            className="py-2 mb-2  text-sm font-medium text-primary focus:outline-none bg-primary/5
                     rounded-md transition duration-300 hover:bg-primary/10 focus:z-10 focus:ring-4 focus:ring-gray-200 w-[108px]"
          >
            {wishList ? (
              <>
                <FaHeart className="inline  font-bold text-secondary mr-1" />
                Saved
              </>
            ) : (
              <>
                <FaRegHeart className="inline font-bold mr-1" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* price section  */}
      <hr className="w-full" />
      <p className="my-2 font-semibold text-3xl text-orange-500 flex items-center ">
        <span className="text-4xl">
          <TbCurrencyTaka></TbCurrencyTaka>
        </span>
        {price}
      </p>
      <p className="text-gray-600 mb-4">
        Product Color : <span className="font-semibold">{primary_color}</span>
      </p>

      <div className="flex flex-wrap items-center text-gray-600 mb-4">
        Available Color :
        {available_color?.map((color) => (
          <Tooltip
            content={color?.name}
            className="text-xs text-red-400 inline"
            style="light"
            key={color?.id}
          >
            <div
              className={`w-6 h-6 rounded-full ml-1 hover:border-orange-400 border-2 cursor-pointer ${
                selectedColor === color.name
                  ? "border-orange-500 scale-110"
                  : ""
              }`}
              style={{ backgroundColor: color?.id }}
              onClick={() => handleColorSelect(color?.name)}
            ></div>
          </Tooltip>
        ))}
      </div>
      <hr className="w-full" />

      {/* quantity  */}
      <div className="flex items-center mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded-l"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          className="bg-white px-4 py-2 w-16 text-center"
          value={quantity}
          onChange={handleInputChange}
        />
        <button
          className="bg-gray-300 px-4 py-2 rounded-r"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>

      <div className="flex my-6">
        <span className="mr-2">
          <Link to="/cart">
            {" "}
            <Button
              gradientMonochrome="success"
              onClick={() => handleAddToCart(singleProduct)}
            >
              Checkout
            </Button>
          </Link>
        </span>
        <Button
          gradientDuoTone="purpleToPink"
          outline
          onClick={() => handleAddToCart(singleProduct)}
        >
          <p>Add to Cart</p>
        </Button>
      </div>
    </div>
  );
};

export default ProductHighlightSection;
