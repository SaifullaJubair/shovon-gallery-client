import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Loader from "../../Shared/Loader/Loader";
import useAdmin from "../../hooks/useAdmin";
import useBuyer from "../../hooks/useBuyer";
import TopNavbar from "../../Shared/TopNavbar/TopNavbar";
import { Link, Outlet } from "react-router-dom";
import SecondNavbar from "../../Shared/SecondNavbar/SecondNavbar";
import { AiOutlineLogout } from "react-icons/ai";
import { BiCommentDetail, BiGroup } from "react-icons/bi";
import { BsGraphUp, BsNewspaper } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { FaHeart, FaLaptopHouse, FaHouseDamage } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [hide, setHide] = useState(true);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  const handleToggle = () => {
    setHide(!hide);
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/singleuser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUserData(data);
        });
    }
  }, [user]);
  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  if (isAdminLoading || isBuyerLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <TopNavbar></TopNavbar>
      <SecondNavbar></SecondNavbar>

      <div className="mx-auto flex gap-2">
        <aside
          className="bg-primary  inset-y-0 left-0 z-50  min-h-screen text-white  w-fit "
          onMouseEnter={() => setHide(false)}
        >
          <div
            className={
              hide
                ? `h-full p-3 space-y-2 w-[80px] `
                : `h-full p-3 space-y-2 w-[230px]  `
            }
          >
            <div
              className={
                hide
                  ? `flex flex-col gap-4 py-2 items-center`
                  : `flex flex-col gap-4 py-2 ml-4`
              }
            >
              <span
                onClick={() => handleToggle()}
                className={
                  hide
                    ? "flex items-center justify-center text-center text-xl"
                    : `flex text-lg`
                }
              >
                <HiOutlineMenu
                  className={`${!hide} && 'ml-20' `}
                ></HiOutlineMenu>{" "}
              </span>
              <img
                src={userData?.img}
                alt=""
                className="w-12 h-12 rounded-full dark:bg-gray-500"
              />
              <div className={hide ? "hidden hover:block" : "block"}>
                <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                <h4>{userData?.role}</h4>
              </div>
            </div>
            <div className="divide-y divide-gray-700">
              <ul className="pt-2 pb-4 space-y-1 text-lg flex flex-col gap-4">
                {isBuyer && (
                  <>
                    <li>
                      <FaHeart className="inline-block ml-4 mr-6 h-7" />
                      <Link to={`/dashboard/myorders`}>
                        <span className={hide ? "hidden" : "inline"}>
                          My Orders
                        </span>
                      </Link>
                    </li>

                    {/* <li>
                    <FaHeart className="inline-block ml-4 mr-6 h-7" />
                    <Link to={`/dashboard/mywishlist`}>
                      <span className={hide ? "hidden" : "inline"}>
                        My Wishlist
                      </span>
                    </Link>
                  </li> */}
                    {/* <li>
                  <BiDislike className="inline-block ml-4 mr-6 h-7"></BiDislike>
                  <Link to={`/dashboard/myfeedback`}>
                    <span className={hide ? "hidden" : "inline"}>
                      My Feedback
                    </span>
                  </Link>
                </li> */}
                    {/* <li>
                    <BiCommentDetail className="inline-block ml-4 mr-6 h-7"></BiCommentDetail>
                    <Link to={`/dashboard/mycomments`}>
                      <span className={hide ? "hidden" : "inline"}>
                        My Comments
                      </span>
                    </Link>
                  </li> */}
                  </>
                )}

                {isAdmin && (
                  <>
                    <li>
                      <FaLaptopHouse className="inline-block ml-4 mr-6 h-7"></FaLaptopHouse>
                      <Link to={`/dashboard/add-product`}>
                        <span className={hide ? "hidden" : "inline"}>
                          Add Products
                        </span>
                      </Link>
                    </li>
                    <li>
                      <FaHeart className="inline-block ml-4 mr-6 h-7" />
                      <Link to={`/dashboard/addcategories`}>
                        <span className={hide ? "hidden" : "inline"}>
                          Categories
                        </span>
                      </Link>
                    </li>

                    <li>
                      <BiGroup className="inline-block ml-4 mr-6 h-7"></BiGroup>
                      <Link to={`/dashboard/allusers`}>
                        <span className={hide ? "hidden" : "inline"}>
                          All Users
                        </span>
                      </Link>
                    </li>

                    {/* <li>
                  <BiCommentDetail className="inline-block ml-4 mr-6 h-7"></BiCommentDetail>
                  <Link to={`/dashboard/allfeedback`}>
                    <span className={hide ? "hidden" : "inline"}>
                      All Feedback
                    </span>
                  </Link>
                </li> */}
                    {/* 
                   
                    <li className="dark:bg-gray-800 dark:text-gray-50">
                      <CgAddR className="inline-block ml-4 mr-6 h-7 text-white"></CgAddR>
                      <Link to={`/dashboard/addproperty`}>
                        <span className={hide ? "hidden" : "inline"}>
                          {" "}
                          Add Property
                        </span>
                      </Link>
                    </li> */}

                    {/* 
                  <li>
                    <BiCommentDetail className="inline-block ml-4 mr-6 h-7"></BiCommentDetail>
                    <Link to={`/dashboard/mycomments`}>
                      <span className={hide ? "hidden" : "inline"}>
                        My Comments
                      </span>
                    </Link>
                  </li>

                  <li>
                    <BiCommentDetail className="inline-block ml-4 mr-6 h-7"></BiCommentDetail>
                    <Link to={`/dashboard/allcomments`}>
                      <span className={hide ? "hidden" : "inline"}>
                        All Comments
                      </span>
                    </Link>
                  </li>
                  <li>
                    <RiEditBoxLine className="inline-block ml-4 mr-6 h-7"></RiEditBoxLine>
                    <Link to={`/dashboard/allblogs`}>
                      <span className={hide ? "hidden" : "inline"}>
                        All Blogs
                      </span>
                    </Link>
                  </li> */}
                  </>
                )}

                {/*  Admin end here */}
                <li>
                  <FaHeart className="inline-block ml-4 mr-6 h-7" />
                  <Link to={`/dashboard/mywishlist`}>
                    <span className={hide ? "hidden" : "inline"}>
                      My Wishlist
                    </span>
                  </Link>
                </li>
                <li>
                  <RiEditBoxLine className="inline-block ml-4 mr-6 h-7"></RiEditBoxLine>
                  <Link to={`/dashboard/myblog`}>
                    <span className={hide ? "hidden" : "inline"}>My Blog</span>
                  </Link>
                </li>

                <li>
                  <BsGraphUp className="inline-block ml-4 mr-6 h-7"></BsGraphUp>
                  <Link to={`/dashboard/statistics`}>
                    <span className={hide ? "hidden" : "inline"}>
                      Statistics
                    </span>
                  </Link>
                </li>
              </ul>
              <hr className="bg-white border-0" />

              <ul className="pt-4 pb-2  text-lg flex flex-col gap-4">
                <li>
                  <MdOutlineAccountCircle className="inline ml-4 mr-6 h-7"></MdOutlineAccountCircle>
                  <Link to={`/userprofile`}>
                    <span className={hide ? "hidden" : "inline"}>Profile</span>
                  </Link>
                </li>
                <li>
                  <AiOutlineLogout className="inline ml-4 mr-6 h-7"></AiOutlineLogout>
                  <span
                    className={hide ? "hidden" : "inline"}
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <Outlet></Outlet>
      </div>

      {/* <Footer> </Footer> */}
    </div>
  );
};

export default DashboardLayout;
