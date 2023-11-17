import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

import { BsStarFill } from "react-icons/bs";
import { Button, Tooltip } from "flowbite-react";
import { toast } from "react-toastify";
import QnA from "./QnA";
import Suggest from "./Suggest";
import Loader from "../../Shared/Loader/Loader";
import RightSideContactForm from "./RightSideContactForm";
import ProductSpecification from "./ProductSpecification";
import ProductHighlightSection from "./ProductHighlightSection";
import SubmitReview from "./SubmitReview";
import ShowReview from "./ShowReview";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [suggestProduct, setSuggestProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user, loading } = useContext(AuthContext);
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
        if (data.error) {
          setSingleProduct({});
          console.log("err:", data.error);
          toast.error("Sorry! Product is not available.");
        } else {
          // If data is successfully fetched, set the product details
          setSingleProduct(data);
        }
        // console.log(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/category/${singleProduct.category}`)
      .then((res) => res.json())
      .then((data) => {
        const availableProducts = data?.filter(
          (product) => product?.product_status === "Available"
        );
        setSuggestProduct(availableProducts?.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
        setLoading(false);
      });
  }, [singleProduct]);

  if (loading || isLoading) {
    return <Loader />;
  }

  if (!singleProduct || singleProduct.product_status !== "Available") {
    return (
      <section className="flex items-center h-full sm:p-16 bg-gray-50 text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-40 h-40 text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>
          <p className="text-3xl">
            Looks like our product is currently unavailable!
          </p>
          <Link
            to="/"
            rel="noopener noreferrer"
            href="#"
            className="px-8 py-3 font-semibold rounded bg-orange-600 text-gray-50 hover:scale-105 duration-100"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    );
  }
  return (
    <div className="my-10 mb-10 max-w-[1440px] w-[95%] mx-auto overflow-x-auto">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-7 ">
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
          <ProductHighlightSection singleProduct={singleProduct} />
        </div>

        {/*--------- right sidebar -------- */}
        <div className="lg:col-span-2 bg-gray-100/50 md md:col-span-2 hidden md:flex flex-col   col-span-1  ">
          <RightSideContactForm singleProduct={singleProduct} />
        </div>
      </div>

      {/* product specification  */}

      <div className="grid lg:grid-cols-7 md:grid-5 grid-cols-1 gap-2 my-10">
        <div className="lg:col-span-5 md:col-span-3 col-span-1">
          <ProductSpecification singleProduct={singleProduct} />
          {/* Product Review  */}
          <div>
            <h1 className="bg-gray-50 p-2 my-4 lg:text-lg md:text-lg text-md font-semibold text-gray-700">
              Ratings & Reviews of {product_heading}
            </h1>
            <ShowReview singleProduct={singleProduct}></ShowReview>
          </div>
          {/* QnS  */}
          <div>
            <QnA singleProduct={singleProduct}></QnA>
          </div>
        </div>
        {/* ... */}

        {/* Suggest Product Right side */}
        <div className="lg:col-span-2 md:col-span-2 col-span-1">
          <Suggest
            suggestProduct={suggestProduct}
            singleProduct={singleProduct}
          ></Suggest>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
