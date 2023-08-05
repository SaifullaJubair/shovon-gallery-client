import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-up";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import Aos from "aos";

function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
      <ScrollToTop showUnder={160}>
        <span className="text-4xl text-blue-600 hover:text-sky-600">
          <BsArrowUpCircleFill className="animate-bounce"></BsArrowUpCircleFill>
        </span>
      </ScrollToTop>
    </div>
  );
}

export default App;
