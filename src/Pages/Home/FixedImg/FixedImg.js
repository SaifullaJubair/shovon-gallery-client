import React from "react";
// import "./FixedImg.css";
import second from "../../../assets/product-img/Antique Jewellery Set-4.png";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../Shared/Loader/Loader";

const FixedImg = () => {
  const [fixedImage, setFixedImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/allFixedImg")
      .then((res) => res.json())
      .then((data) => {
        // Find the latest active fixed image
        const sortedData = data
          .filter((item) => item.status === "Active")
          .sort((a, b) => {
            const dateA = new Date(a.post_date);
            const dateB = new Date(b.post_date);
            return dateB - dateA;
          });

        if (sortedData.length > 0) {
          const latestFixedImg = sortedData;
          // console.log("Latest Active FixedImg URL:", latestFixedImg);
          setFixedImg(latestFixedImg);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);
  if (isLoading) {
    <Loader />;
  }
  console.log(fixedImage);
  const backgroundImageStyle = {
    backgroundImage: `url(${fixedImage[0]?.fixedImg})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };
  console.log(fixedImage.length);
  return (
    <div>
      {fixedImage?.length > 0 ? (
        <div className="my-16 " style={backgroundImageStyle}></div>
      ) : (
        <div
          className="min-h-screen  bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(https://i.ibb.co/hMKgX7k/Artificial-Flower-Bangles-6-1.jpg)`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></div>
      )}
    </div>
  );
};

export default FixedImg;
