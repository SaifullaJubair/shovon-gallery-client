import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

import { BsStarFill } from "react-icons/bs";
import { Button, Tooltip } from "flowbite-react";
import { toast } from "react-toastify";
import QnA from "./QnA";

// function numberWithCommas(x) {
//   x = x.toString();
//   var pattern = /(-?\d+)(\d{3})/;
//   while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
//   return x;
// }

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [showCallNowModal, setShowCallNowModal] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [cart, setCart] = useState(false);
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();
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

  // const priceWithCommas = numberWithCommas(price);

  useEffect(() => {
    fetch(`http://localhost:5000/singleproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data);
        // console.log(data);
      });
  }, []);

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
    <div className="my-10 mb-10 max-w-[1440px] w-[95%] mx-auto overflow-x-auto">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-7  border-black border-2">
        {/* img div  */}
        <div className=" lg:col-span-2 md:col-span-2 sm:col-span-1  col-span-1 ">
          <div className="">
            <section>
              <img
                className=" w-full lg:h-[382px]  md:h-[272px] sm:h-[353px]"
                src={primary_img}
                alt="property_picture"
              />
            </section>
            <section className=" my-2 flex ">
              <img
                src={feature_img1}
                alt="feature_img-1"
                className="mb-2 h-20 w-20 mr-2 border-2"
              />
              <img
                src={feature_img2}
                className="h-20 w-20 0 border-2"
                alt="feature_img-1"
              />
            </section>
          </div>
        </div>

        {/* Name price and buy add to cart section  */}
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-1 col-span-1 p-4 ">
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
                <span className=" text-blue-400  font-semibold">
                  {" "}
                  16 Ratings
                </span>{" "}
                |
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
            Product Color :{" "}
            <span className="font-semibold">{primary_color}</span>
          </p>

          <div className="flex flex-wrap items-center text-gray-600 mb-4">
            Available Color :
            {available_color?.map((color) => (
              <Tooltip
                content={color?.name}
                className="text-xs text-red-400 inline"
                style="light"
              >
                <div
                  key={color?.id}
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

        {/*--------- right sidebar -------- */}
        <div className="lg:col-span-2 bg-gray-100/50 md md:col-span-2 hidden md:flex flex-col   col-span-1  ">
          <form className="m-2">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            </div>
            <div className="mb-6">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="text-white bg-secondary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md lg:text-md md:text-sm w-full sm:w-auto lg:px-5 md:px-3 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
              >
                Submit
              </button>
              <span
                onClick={() => setShowCallNowModal(!showCallNowModal)}
                className="text-white bg-secondary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md lg:text-md md:text-sm w-full sm:w-auto lg:px-5 md:px-3 text-md py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900 flex items-center gap-1 cursor-pointer"
              >
                <IoCall /> Call Now
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* product specification  */}

      <div className="grid lg:grid-cols-7 md:grid-5 grid-cols-1 gap-2 my-10">
        <div className="lg:col-span-5 md:col-span-3 col-span-1">
          <p className="text-lg font-semibold bg-gray-50 p-2 text-gray-800">
            Product Specification of {product_name}
          </p>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Product Type
                  </th>
                  <td className="px-6 py-4">{product_name}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Color
                  </th>
                  <td className="px-6 py-4">{primary_color}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Available Color
                  </th>
                  <td className="px-6 py-4 flex ">
                    {" "}
                    {available_color?.map((color) => (
                      <div
                        key={color?.id}
                        className="mr-2"
                        // style={{ backgroundColor: color?.id }}
                      >
                        {" "}
                        {color?.name},
                      </div>
                    ))}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Category
                  </th>
                  <td className="px-6 py-4">{category}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Box Content
                  </th>
                  <td className="px-6 py-4">{box_content}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Registered
                  </th>
                  <td className="px-6 py-4">{post_date?.slice(0, 10)}</td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Reference no.
                  </th>
                  <td className="px-6 py-4">SG-{_id}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Product Details  */}
          <div className="mb-6">
            <p className="text-lg bg-gray-50 p-2 font-semibold my-2 text-gray-800 break-words">
              Product Details of : {product_name}
            </p>
            <p className="text-gray-800 m-2 break-words">{product_highlight}</p>
            <p className="text-gray-800 m-2  break-words">{details}</p>
          </div>
          {/* Product Review  */}
          <div>
            <h1>Here Review will pending</h1>
          </div>
          {/* QnS  */}
          <div>
            <QnA singleProduct={singleProduct}></QnA>
          </div>
        </div>
        {/* ... */}

        {/* Suggest Product Right side */}
        <div className="lg:col-span-2 md:col-span-2 col-span-1">
          <img src={primary_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
