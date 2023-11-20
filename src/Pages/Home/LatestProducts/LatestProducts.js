import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import LatestProductCard from "./LatestProductCard";
import FlashCard from "../FlashSale/FlashCard/FlashCard";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://shovon-gallery-server.vercel.app/latest-products-by-category"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const availableProducts = data.filter(
          (product) => product.product_status === "Available"
        );
        setProducts(availableProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("Tranding products", products);
  return (
    <div>
      {products.length !== 0 && (
        <div className="my-12 w-full ">
          <div>
            <h1 className="text-2xl mt-16 mb-6 text-gray-700 font-semibold">
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
      )}
    </div>
  );
};

export default LatestProducts;
