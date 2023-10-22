import { Avatar, Dropdown } from "flowbite-react";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { FaCarAlt, FaCartPlus } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

const SecondNavbar = () => {
  let [open, setOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const [singleUser, setSingleUser] = useState(null);
  useEffect(() => {
    if (user && user.email) {
      // Fetch user data only if user is available and has an email
      fetch(`http://localhost:5000/singleuser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleUser(data);
        })
        .catch((error) => {
          // Handle fetch error if necessary
          console.error(error);
        });
    } else {
      // Handle case when user is not authenticated
      setSingleUser(null); // Set singleUser to null or an empty object
    }
  }, [user]);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="sticky top-0 z-40">
      <div className=" max-w-[1440px]  mx-auto ">
        <div className="md:flex items-center justify-between bg-white py-2 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-900">
            <span className="text-3xl text-red-700 mr-1 pt-2">
              <ion-icon name="car"></ion-icon>
            </span>
            Designer
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"} />
          </div>

          {/* <div className="w-full ml-8 mr-4">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div> */}

          <ul
            className={`md:flex md:items-center lg:py-0 md:py-0 sm:py-6 py-6 md:pb-0 absolute md:static bg-white  sm:bg-slate-100 bg-slate-100  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-[62px] " : "top-[-490px]"
            }`}
          >
            <li className=" md:mt-0 lg:mt-0">
              <NavLink
                to="/"
                className="md:ml-8 text-md font-semibold md:my-0 my-7 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                Home
              </NavLink>
            </li>
            <li className=" my-2 md:my-0 lg:my-0">
              <div className="md:ml-8 text-md font-semibold md:my-0 my-7 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
                <Dropdown arrowIcon={true} inline label="Category">
                  <ul>
                    {categories.map((category) => (
                      <li key={category?._id} className="my-1.5">
                        {" "}
                        <NavLink
                          className="p-2 m-2 text-gray-600 font-semibold border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
                          to={`/category/${category?.name}`}
                        >
                          {" "}
                          {category?.name}{" "}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>
              {/* <NavLink
                to="/categories"
                className="md:ml-8 text-md font-semibold  text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                Categories
              </NavLink> */}
            </li>
            <li className=" my-2 md:my-0 lg:my-0">
              <NavLink
                to="/allproducts"
                className="md:ml-8 text-md font-semibold  text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                AllProducts
              </NavLink>
            </li>
            {/* <li className=" my-2 md:my-0 lg:my-0">
              <NavLink
                to="/about"
                className="md:ml-8 text-md font-semibold  text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                About
              </NavLink>
            </li> */}
            <li className="mb-2 md:mb-0 lg:mb-0">
              <NavLink
                to="/contact"
                className="md:ml-8 text-md font-semibold md:my-0 my-7 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                ContactUs
              </NavLink>
            </li>
            <li className="mb-2 md:mb-0 lg:mb-0 ml-auto md:ml-0">
              <NavLink
                to="/cart"
                className="md:ml-8 text-md font-semibold md:my-0 my-7 flex items-center border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                Cart <BsCartPlus className="ml-2" />
              </NavLink>
            </li>
            <div>
              {user?.uid ? (
                <>
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        alt="User settings"
                        img={singleUser?.img}
                        rounded
                        className="md:ml-8 text-xl "
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="block text-sm">{singleUser?.name}</span>
                      <span className="block truncate text-sm font-medium">
                        {singleUser?.email}
                      </span>
                    </Dropdown.Header>
                    <ul>
                      <li>
                        <Link
                          className="ml-4 md:my-0 my-8 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
                          to="/userprofile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ml-4 md:my-0 my-8 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
                          to="/dashboard"
                        >
                          DashBoard
                        </Link>
                      </li>
                      <li>
                        <Link className="ml-4 md:my-0 my-8 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
                          Earnings
                        </Link>
                      </li>
                      <Dropdown.Divider />
                      <li onClick={handleLogout}>
                        <Link className="ml-4 md:my-0 my-8 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </Dropdown>
                </>
              ) : (
                <>
                  <ul className="md:flex md:items-center">
                    <li>
                      <NavLink
                        to="/register"
                        className="md:ml-8 text-md font-semibold md:my-0 my-7 text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700  duration-500  "
                      >
                        SignUp
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className=" md:ml-8 text-md md:my-0  my-7 font-semibold text-gray-900 border-b-2 border-transparent hover:border-red-700 hover:text-red-700  duration-500"
                      >
                        LogIn
                      </NavLink>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecondNavbar;
