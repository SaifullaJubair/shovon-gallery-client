import React from "react";
import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import FlashSale from "../FlashSale/FlashSale";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedCategories></FeaturedCategories>
      <FlashSale></FlashSale>
    </div>
  );
};

export default Home;
