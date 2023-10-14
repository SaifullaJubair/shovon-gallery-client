import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import {
  FaBath,
  FaBed,
  FaBorderAll,
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";

import { BiInfoCircle, BiPurchaseTagAlt, BiSend } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";

// function numberWithCommas(x) {
//   x = x.toString();
//   var pattern = /(-?\d+)(\d{3})/;
//   while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
//   return x;
// }

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCallNowModal, setShowCallNowModal] = useState(false);
  const [wishList, setWishList] = useState(false);
  const { user } = useContext(AuthContext);

  const { id } = useParams();
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
    available_color,
    user_email,
    user_image,
    user_name,
    product_highlight,
    details,
    feature_img1,
    feature_img2,
    wishlist,
  } = singleProduct;

  // const priceWithCommas = numberWithCommas(price);

  useEffect(() => {
    fetch(`http://localhost:5000/singleproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data);
        console.log(data);
      });
  }, []);

  const handleWishList = (singleProduct) => {
    setWishList((prevState) => !prevState);

    const wishItemInfo = {
      // UserInfo
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      // ProductInfo
      productId: singleProduct?._id,
      product_name: singleProduct?.product_name,
      category: singleProduct?.category,
      primary_color: singleProduct?.primary_color,
      primary_img: singleProduct?.primary_img,
      price: singleProduct?.price,
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
  return (
    <div className="my-10 mb-10 max-w-[1440px] w-[95%] mx-auto overflow-x-auto">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-7  border-black border-2">
        {/* img div  */}
        <div className=" lg:col-span-2 md:col-span-2 sm:col-span-1  col-span-1  border-red-500 border-2">
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
                className="mb-2 h-20 w-20 mr-2 border-orange-400 border-2"
              />
              <img
                src={feature_img2}
                className="h-20 w-20 0 border-orange-400 border-2"
                alt="feature_img-1"
              />
            </section>
          </div>
        </div>

        {/* Name price and buy add to cart section  */}
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-1 col-span-1 border-red-500 border-2 p-2 ">
          <h2 className="font-semibold lg:text-2xl md:text-2xl sm:text-xl text:lg  text-gray-800 max-w-screen-md">
            {product_heading}
          </h2>
          {/* review and ans section  */}
          <section className=" flex items-center gap-1 mt-4 mb-6 ">
            <span className="flex items-center gap-1">
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
            </span>
            <p className="text-xs">
              <span className=" text-blue-400  font-semibold"> 16 Ratings</span>{" "}
              |
              <span className=" text-blue-400  font-semibold">
                {" "}
                10 Answered Questions
              </span>
            </p>
          </section>

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
          <hr className="w-full" />

          <p className="text-gray-600 my-4">Color Family : </p>
        </div>
        {/*--------- right sidebar -------- */}
        <div className="lg:col-span-2 md md:col-span-2 hidden md:flex flex-col   col-span-1 border-red-500 border-2 ">
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
    </div>
  );
};

export default SingleProduct;
