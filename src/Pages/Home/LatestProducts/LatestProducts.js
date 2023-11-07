import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import LatestProductCard from "./LatestProductCard";
import FlashCard from "../FlashSale/FlashCard/FlashCard";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/latest-products-by-category")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      });
  }, []);
  return (
    <div className="my-12 w-full ">
      <div>
        <h1 className="text-2xl my-6 text-gray-700 font-semibold">
          Trending Product
        </h1>
      </div>
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 ">
        {products.map((product) => (
          <LatestProductCard
            key={product?._id}
            product={product}
          ></LatestProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
