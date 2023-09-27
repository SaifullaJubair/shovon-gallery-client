import { Avatar, Dropdown } from "flowbite-react";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const NavbarBottom = () => {
  let [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="sticky top-0 z-40">
      <div className="shadow-md w-full ">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-red-700 mr-1 pt-2">
              <ion-icon name="car"></ion-icon>
            </span>
            Designer
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"} />
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static lg:bg-white md:bg-white sm:bg-slate-100 bg-slate-100  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            <li className="mt-2 md:mt-0 lg:mt-0">
              <NavLink
                to="/"
                className="md:ml-8 text-lg md:my-0 my-7 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                Home
              </NavLink>
            </li>
            <li className=" my-2 md:my-0 lg:my-0">
              <NavLink
                to="/about"
                className="md:ml-8 text-lg  text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                About
              </NavLink>
            </li>
            <li className="mb-2 md:mb-0 lg:mb-0">
              <NavLink
                to="/contact"
                className="md:ml-8 text-lg md:my-0 my-7 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
              >
                ContactUs
              </NavLink>
            </li>

            <li>
              <div>
                {user?.uid ? (
                  <>
                    <Dropdown
                      arrowIcon={false}
                      inline
                      label={
                        <Avatar
                          alt="User settings"
                          img={user?.photoURL}
                          rounded
                          className="md:ml-8 text-xl "
                        />
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm">
                          {user?.displayName}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {user?.email}
                        </span>
                      </Dropdown.Header>
                      <ul>
                        <li>
                          <Link className="ml-4 md:my-0 my-8 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="ml-4 md:my-0 my-8 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
                            DashBoard
                          </Link>
                        </li>
                        <li>
                          <Link className="ml-4 md:my-0 my-8 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
                            Earnings
                          </Link>
                        </li>
                        <Dropdown.Divider />
                        <li onClick={handleLogout}>
                          <Link className="ml-4 md:my-0 my-8 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500">
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
                          className="md:ml-8 text-lg md:my-0 my-7 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700  duration-500  "
                        >
                          SignUp
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          className=" md:ml-8 text-lg md:my-0 my-7 text-gray-800 border-b-2 border-transparent hover:border-red-700 hover:text-red-700  duration-500"
                        >
                          LogIn
                        </NavLink>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
