import { Button, Tooltip } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "react-toastify";

const ProductHighlightSection = ({ singleProduct }) => {
  const [wishList, setWishList] = useState(false);
  const [cart, setCart] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  const {
    _id,
    product_name,
    category,
    product_heading,
    box_content,
    primary_color,
    primary_img,
    price,
    available_color,

    product_highlight,
    details,
    feature_img1,
    feature_img2,
    post_date,
  } = singleProduct;

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
        `http://localhost:5000/wishlist/${singleProduct?._id}?email=${user?.email}`,
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
      return fetch("http://localhost:5000/add-wishlist", {
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
      `http://localhost:5000/wishlist/${singleProduct?._id}?email=${user?.email}`
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
      `http://localhost:5000/cart/${singleProduct?._id}?email=${user?.email}`
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
          fetch("http://localhost:5000/add-cart", {
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

  return (
    <div>
      <h2 className="font-semibold lg:text-2xl md:text-2xl sm:text-xl text:lg  text-gray-800 max-w-screen-md">
        {product_heading}
      </h2>
      {/* review and ans section  */}
      <div className="flex justify-between items-center">
        <section className=" flex items-center gap-1 mt-4 mb-6 ">
          <span className="flex items-center gap-1">
            <BsStarFill className="text-yellow-300 text-xs" />
            <BsStarFill className="text-yellow-300 text-xs" />
            <BsStarFill className="text-yellow-300 text-xs" />
            <BsStarFill className="text-yellow-300 text-xs" />
            <BsStarFill className="text-yellow-300 text-xs" />
          </span>
          <p className="text-xs">
            <span className=" text-blue-400  font-semibold"> 16 Ratings</span> |
            <span className=" text-blue-400  font-semibold">
              {" "}
              10 Answered Questions
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
          {/* {user?.email && !singleProduct?.paid && (
                <Link
                  to={`/purchase/${singleProduct?._id}`}
                  type="button"
                  className="py-2.5 px-5 mr-2 mb-2 text-md font-medium text-primary focus:outline-none bg-primary/5
                     rounded-md transition duration-300 hover:bg-primary/10 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <BiPurchaseTagAlt className="inline mr-2 font-bold">
                    Buy now
                  </BiPurchaseTagAlt>
                </Link>
              )} */}
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
          <Button gradientMonochrome="success">Buy</Button>
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
