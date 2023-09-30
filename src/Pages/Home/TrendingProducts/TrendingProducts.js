import { Card } from "flowbite-react";
import React from "react";
import TrendingCard from "./TrendingCard";

const TrendingProducts = () => {
  return (
    <div className="my-12 w-full ">
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 mx-6 ">
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
        <TrendingCard></TrendingCard>
      </div>
    </div>
  );
};

export default TrendingProducts;
