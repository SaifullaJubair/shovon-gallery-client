import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://shovon-gallery-server.vercel.app/allcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="my-10">
      <h2 className="text-2xl mx-3 text-gray-700 font-semibold my-8">
        Featured Categories
      </h2>
      <div className="bg-gray-100">
        <div className="relative px-4 py-16 mx-auto sm:max-w-2xl md:max-w-full lg:max-w-screen-3xl md:px-8 lg:px-8 lg:py-20">
          <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
            <svg
              viewBox="0 0 88 88"
              className="w-full max-w-screen-xl text-indigo-100"
            >
              <circle fill="currentColor" cx="44" cy="44" r="15.5" />
              <circle
                fillOpacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="44"
              />
              <circle
                fillOpacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="37.5"
              />
              <circle
                fillOpacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="29.5"
              />
              <circle
                fillOpacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="22.5"
              />
            </svg>
          </div>
          <div className="relative grid gap-2 grid-cols-3 md:grid-cols-6 lg:grid-cols-7">
            {categories.map((category) => (
              <Link to={`/category/${category?.name}`} key={category?._id}>
                <div className=" transition-shadow-lg duration-200 bg-white rounded-xl shadow-xl group hover:shadow-2xl">
                  <div className="py-5 px-2 overflow-hidden h-[140px]">
                    <div className="flex items-center mx-auto justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50">
                      <svg
                        className="w-8 h-8  text-deep-purple-accent-400"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                    <p className="mb-2 text-center text-sm  font-semibold">
                      {category?.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {/* repeat div  */}
          </div>

          {/* sfd */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
