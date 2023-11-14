import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import ScrollToTop from "react-scroll-up";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import Aos from "aos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
      <ScrollToTop showUnder={160}>
        <span className="text-4xl text-blue-600  print:hidden hover:text-sky-600">
          <BsArrowUpCircleFill className="animate-bounce"></BsArrowUpCircleFill>
        </span>
      </ScrollToTop>
    </div>
  );
}

export default App;
