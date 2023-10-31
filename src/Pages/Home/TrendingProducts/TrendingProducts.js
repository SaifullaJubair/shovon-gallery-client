import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import TrendingCard from "./TrendingCard";
import FlashCard from "../FlashSale/FlashCard/FlashCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data.slice(0, 4));
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
          <FlashCard key={product?._id} product={product}></FlashCard>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
