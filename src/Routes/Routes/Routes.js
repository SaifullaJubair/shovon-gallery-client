import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import Contact from "../../Pages/ContactUs/Contact";
import AllBuyers from "../../Pages/DashBoard/AllBuyers/AllBuyers";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import AllProductsDashboard from "../../Pages/DashBoard/AllProductsDashboard/AllProductsDashboard";
import MyOrders from "../../Pages/DashBoard/MyOrders/MyOrders";

import MyWishList from "../../Pages/DashBoard/MyWishList/MyWishList";
import AddToCart from "../../Pages/Home/AddToCart/AddToCart";
import SingleProduct from "../../Pages/SingleProduct/SingleProduct";
import UserProfile from "../../Pages/UserProfile/UserProfile";

import AdminRoute from "../AdminRoutes/AdminRoutes";
import PrivateRoute from "./PrivateRoute";
import UpdateProduct from "../../Pages/DashBoard/UpdateProduct/UpdateProduct";
import ProductByCategory from "../../Pages/ProductsByCategory/ProductByCategory";
import AddProducts from "../../Pages/DashBoard/AddProducts/AddProducts";
import Categories from "../../Pages/DashBoard/Categories/Categories";
import AddBannerImg from "../../Pages/DashBoard/AddBannerImg/AddBannerImg";
import AddFixedImg from "../../Pages/DashBoard/AddFixedImg/AddFixedImg";
import MyQnA from "../../Pages/DashBoard/MyQnA/MyQnA";
import MyReviewDashboard from "../../Pages/DashBoard/MyReviewDashboard/MyReviewDashboard";
import Checkout from "../../Pages/Checkout/Checkout";
import Statistics from "../../Pages/DashBoard/Statistics/Statistics";
import PaymentSuccess from "../../Pages/Payment/PaymentSuccess";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main/Main");
const { default: UnKnownRoutes } = require("../UnKnownRoutes/UnKnownRoutes");
const { default: Home } = require("../../Pages/Home/Home/Home");
const { default: Login } = require("../../Pages/Login/Login");
const { default: Register } = require("../../Pages/Register/Register");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <UnKnownRoutes></UnKnownRoutes>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/category/all",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <AddToCart></AddToCart>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/singleproduct/:id",
        element: <SingleProduct></SingleProduct>,
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/singleproduct/${params.id}`),
      },
      {
        path: "/category/:name",
        element: <ProductByCategory></ProductByCategory>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.name}`),
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },

      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/userprofile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <UnKnownRoutes></UnKnownRoutes>,
    children: [
      // {
      //   path: "/dashboard",
      //   element: <DashBoard></DashBoard>,
      // },
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/mywishlist",
        element: <MyWishList></MyWishList>,
      },
      {
        path: "/dashboard/QnA",
        element: <MyQnA></MyQnA>,
      },
      {
        path: "/dashboard/my-review",
        element: <MyReviewDashboard></MyReviewDashboard>,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },

      // Admin Route
      {
        path: "/dashboard/add-product",
        element: (
          <AdminRoute>
            <AddProducts></AddProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-product",
        element: (
          <AdminRoute>
            <AllProductsDashboard></AllProductsDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateproduct/:id",
        element: (
          <AdminRoute>
            <UpdateProduct></UpdateProduct>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/singleproduct/${params.id}`),
      },
      {
        path: "/dashboard/add-categories",
        element: (
          <AdminRoute>
            <Categories />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-banner-img",
        element: (
          <AdminRoute>
            <AddBannerImg />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-fixed-img",
        element: (
          <AdminRoute>
            <AddFixedImg />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>,
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
