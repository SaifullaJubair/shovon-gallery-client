import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../../Shared/TopNavbar/TopNavbar";
import SecondNavbar from "../../Shared/SecondNavbar/SecondNavbar";
import Footer from "../../Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <TopNavbar></TopNavbar>
      <SecondNavbar></SecondNavbar>
      <Outlet></Outlet>
      <Footer> </Footer>
    </div>
  );
};

export default Main;
