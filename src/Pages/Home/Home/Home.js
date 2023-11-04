import React, { useContext } from "react";
import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import FlashSale from "../FlashSale/FlashSale";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import ParallaxBanner from "../ParallaxBanner/ParallaxBanner";
import Discount from "../Discount/Discount";
import IconicProducts from "../IconicProducts/IconicProducts";
import CustomerReview from "../CustomerReview/CustomerReview";
import FixedImg from "../FixedImg/FixedImg";
import ShopLocation from "../ShopLocation/ShopLocation";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <Helmet>
        <title>ShovonGallery-Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedCategories></FeaturedCategories>
      {/* <ParallaxBanner></ParallaxBanner> */}
      <FlashSale></FlashSale>
      <FixedImg></FixedImg>
      <TrendingProducts></TrendingProducts>
      <Discount></Discount>
      <IconicProducts></IconicProducts>
      {/* <CustomerReview></CustomerReview> */}
      <ShopLocation></ShopLocation>
    </div>
  );
};

export default Home;
