import React, { useEffect, useState } from "react";
import "./Parallax.css";

const ParallaxBanner = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const screenWidth = window.innerWidth;
  let parallaxValue;

  // Define different parallax values based on screen size
  if (screenWidth >= 1200) {
    parallaxValue = scrollY * 0.4;
  } else if (screenWidth >= 768) {
    parallaxValue = scrollY * 0.2;
  } else {
    parallaxValue = scrollY * 0.15;
  }

  return (
    <div className="parallax-container my-16">
      {/* <img
        className="parallax-image"
        src="https://thumbs.dreamstime.com/z/accessory-making-home-craft-art-jewellery-layout-wooden-table-72959637.jpg?w=992" // Replace this URL with your image URL
        alt="Parallax"
        style={{ transform: `translateY(-${parallaxValue}px)` }}
      /> */}

      <section
        className="relative parallax-image bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
        style={{ transform: `translateY(-${parallaxValue}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 from-10% via-sky-500 via-30% to-emerald-500 to-80%"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-rose-700">
                Forever Home.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium bg-primary text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxBanner;
