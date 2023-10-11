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
import { BiInfoCircle, BiPurchaseTagAlt, BiSend } from "react-icons/bi";

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
    <div className="my-16 mb-16 max-w-[1440px] w-[95%] mx-auto overflow-x-auto">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-4 md:col-span-2">
          <img
            className="h-auto w-full"
            src={primary_img}
            alt="property_picture"
          />

          {/* details  */}
          <div className="my-5 text-area text-primary">
            <div className="m">
              <div className="flex justify-between">
                <h2 className="text-3xl font-semibold text-orange-600">
                  <span className="text-2xl">BDT </span>
                  {/* {priceWithCommas}/- */} {price}/-
                  <TbCurrencyTaka className="inline mb-2 -ml-2 text-4xl" />
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWishList(singleProduct)}
                    type="button"
                    className="py-2.5 px-5 mr-2 mb-2 text-md font-medium text-primary focus:outline-none bg-primary/5
                     rounded-md transition duration-300 hover:bg-primary/10 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[108px]"
                  >
                    {wishList ? (
                      <>
                        <FaHeart className="inline mr-2 font-bold text-secondary" />
                        Saved
                      </>
                    ) : (
                      <>
                        <FaRegHeart className="inline mr-2 font-bold" />
                        Save
                      </>
                    )}
                  </button>
                  {user?.email && !singleProduct?.paid && (
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
                  )}
                </div>
              </div>

              <h2 className="mb-2 text-xl font-semibold">{product_name}</h2>

              {/* <div className="flex text-lg flat-features">
                <div className="flex justify-start align-middle">
                  <FaBed className="my-1" />
                  <span className="mx-5 ml-2">
                    {singleProduct.flat_feature[0].room} Beds
                  </span>
                </div>
                <div className="flex justify-start align-middle">
                  <FaBath className="my-1" />
                  <span className="mx-5 ml-2">
                    {data.flat_feature[0].bathroom} Baths
                  </span>
                </div>
                <div className="flex justify-start align-middle">
                  <FaBorderAll className="my-1" />
                  <span className="mx-5 ml-2">{data.size}</span>
                </div>
              </div> */}
            </div>
            <h2 className="py-3 my-3 text-2xl font-semibold border-t-2 border-secondary">
              {product_heading}
            </h2>
            <div className="property-details">
              <p className="my-3 text-lg text-gray-500">{details}</p>
            </div>
            <div className="m">
              <h2 className="py-3 mt-3 text-2xl font-semibold">
                PROPERTY INFORMATION
              </h2>

              {/* <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Type
                      </th>
                      <td className="px-6 py-4">{data.property_type}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Purpose
                      </th>
                      <td className="px-6 py-4">{data.property_condition}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Division Status
                      </th>
                      <td className="px-6 py-4">{category}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Completation Status
                      </th>
                      <td className="px-6 py-4">{data.completation_status}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Registered
                      </th>
                      <td className="px-6 py-4">{data.registered}</td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Reference no.
                      </th>
                      <td className="px-6 py-4">FBD-{_id}</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
