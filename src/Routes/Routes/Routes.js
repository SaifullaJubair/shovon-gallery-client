import AboutUs from "../../Pages/AboutUs/AboutUs";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import Contact from "../../Pages/ContactUs/Contact";
import AddToCart from "../../Pages/Home/AddToCart/AddToCart";
import SingleProduct from "../../Pages/SingleProduct/SingleProduct";
import UserProfile from "../../Pages/UserProfile/UserProfile";
import AddProducts from "../../components/AddProducts/AddProducts";
import Categories from "../../components/Categories/Categories";
import PrivateRoute from "./PrivateRoute";

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
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/allproducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/cart",
        element: <AddToCart></AddToCart>,
      },
      {
        path: "/singleproduct/:id",
        element: <SingleProduct></SingleProduct>,
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/singleproduct/${params.id}`),
      },
      {
        path: "/addproducts",
        element: <AddProducts></AddProducts>,
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
    ],
  },
]);

export default router;
