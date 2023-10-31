import React, { useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsArrowLeftShort,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import FlashSaleTitleSection from "./FlashTitle";
import FlashCard from "./FlashCard/FlashCard";
const FlashSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data.slice(0, 4));
      });
  }, []);
  console.log(products);
  return (
    <div className=" mx-auto">
      <div className="flex md:flex-col lg:flex-col xl:flex-col 2xl-flex-row flex-col lg:mx-[60px] md:mx-7 mx-6">
        <div>
          {/* flash sate title  */}
          <div className="flex items-center justify-between">
            <FlashSaleTitleSection></FlashSaleTitleSection>
            <div className="flex items-center justify-center ">
              <BsArrowLeftShort className="mr-2 text-2xl"></BsArrowLeftShort>
              <BsArrowRightCircleFill className="mr-4 text-xl"></BsArrowRightCircleFill>
            </div>
          </div>
          {/* flash sale card section  */}
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-6 gap-8 ">
            {products.map((product) => (
              <FlashCard key={product?._id} product={product}></FlashCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
