import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsStarFill } from "react-icons/bs";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";

const ProductCard = ({ product }) => {
  const [wishList, setWishList] = useState(false);
  // const [singleProduct, setSingleProduct] = useState({});

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
    available_color,
    user_email,
    user_image,
    user_name,
    product_highlight,
    details,
    feature_img1,
    feature_img2,
    wishlist,
  } = product;

  // useEffect(() => {
  //   fetch(`http://localhost:5000/singleproduct/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSingleProduct(data);
  //       console.log(data);
  //     });
  // }, []);

  const handleWishList = (product) => {
    setWishList((prevState) => !prevState);

    const wishItemInfo = {
      // UserInfo
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      // ProductInfo
      productId: product?._id,
      product_name: product?.product_name,
      category: product?.category,
      primary_color: product?.primary_color,
      primary_img: product?.primary_img,
      price: product?.price,
    };
    // console.log(wishItemInfo);

    if (wishList) {
      return fetch(
        `http://localhost:5000/wishlist/${product?._id}?email=${user?.email}`,
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
    fetch(`http://localhost:5000/wishlist/${product?._id}?email=${user?.email}`)
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
        {/* {wishList ? (
          <>
            <FaHeart className="inline mr-2 font-bold absolute end-4 top-4 z-10  text-secondary" />
            Saved
          </>
        ) : (
          <>
            <FaRegHeart className="inline mr-2 absolute end-4 top-4 z-10  font-bold" />
            Save
          </>
        )} */}
        <Link to={`/singleproduct/${product?._id}`}>
          <img
            src={primary_img}
            alt=""
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />

          <div className="relative border border-gray-100 bg-white ">
            <h3 className="mt-4  text-gray-700 mx-4 font-semibold">
              {product_name}
            </h3>
            <h3 className="mt-4  text-gray-500 mx-4 ">{category}</h3>

            <p className="mt-2 mx-2 font-semibold text-lg text-orange-500 flex items-center ">
              <span className="text-xl">
                <TbCurrencyTaka></TbCurrencyTaka>
              </span>
              {price}
            </p>
            <section className=" flex items-center gap-1 mt-2 mb-4 mx-4">
              <span className="flex items-center gap-1">
                <BsStarFill className="text-yellow-300 text-xs" />
                <BsStarFill className="text-yellow-300 text-xs" />
                <BsStarFill className="text-yellow-300 text-xs" />
                <BsStarFill className="text-yellow-300 text-xs" />
                <BsStarFill className="text-yellow-300 text-xs" />
              </span>
              <p className="text-xs text-gray-500">(16)</p>
            </section>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
