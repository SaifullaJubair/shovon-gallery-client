import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useParams } from "react-router-dom";
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
        setSingleProduct(data);
        // console.log(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/category/${singleProduct.category}`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestProduct(data?.slice(0, 6));
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
