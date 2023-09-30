import React from "react";
import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import FlashSale from "../FlashSale/FlashSale";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import ParallaxBanner from "../ParallaxBanner/ParallaxBanner";
import Discount from "../Discount/Discount";
import IconicProducts from "../IconicProducts/IconicProducts";
import CustomerReview from "../CustomerReview/CustomerReview";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedCategories></FeaturedCategories>
      <ParallaxBanner></ParallaxBanner>
      <FlashSale></FlashSale>
      <Discount></Discount>
      <TrendingProducts></TrendingProducts>
      <IconicProducts></IconicProducts>
      <CustomerReview></CustomerReview>
    </div>
  );
};

export default Home;
