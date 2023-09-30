import React from "react";
import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import FlashSale from "../FlashSale/FlashSale";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import ParallaxBanner from "../ParallaxBanner/ParallaxBanner";
import Discount from "../Discount/Discount";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedCategories></FeaturedCategories>
      <ParallaxBanner></ParallaxBanner>
      <FlashSale></FlashSale>
      <Discount></Discount>
      <TrendingProducts></TrendingProducts>
    </div>
  );
};

export default Home;
