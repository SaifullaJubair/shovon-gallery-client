import React from "react";
import { useLoaderData } from "react-router-dom";

const ProductByCategory = () => {
  const products = useLoaderData();

  return (
    <div>
      {products.length} products{" "}
      {products.map((product) => (
        <div key={product._id}>
          <img src={product.primary_img} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ProductByCategory;
