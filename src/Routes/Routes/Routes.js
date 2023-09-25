import AboutUs from "../../Pages/AboutUs/AboutUs";

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
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
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
