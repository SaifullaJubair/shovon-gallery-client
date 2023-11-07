import React from "react";
import { useState } from "react";
import { IoCall } from "react-icons/io5";

const RightSideContactForm = ({ singleProduct }) => {
  const [showCallNowModal, setShowCallNowModal] = useState(false);
  return (
    <div>
      <form className="m-2">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Full Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="floating_phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="mb-6">
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="text-white bg-secondary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md lg:text-md md:text-sm w-full sm:w-auto lg:px-5 md:px-3 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
          >
            Submit
          </button>
          <span
            onClick={() => setShowCallNowModal(!showCallNowModal)}
            className="text-white bg-secondary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md lg:text-md md:text-sm w-full sm:w-auto lg:px-5 md:px-3 text-md py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <IoCall /> Call Now
          </span>
        </div>
      </form>

      {
        // Call Now Modal
        showCallNowModal && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-md rounded-lg md:h-auto">
              <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => setShowCallNowModal(!showCallNowModal)}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <p className="my-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Call Us Now
                  </p>
                  <p className="my-1 text-lg font-normal text-gray-500 dark:text-gray-400"></p>
                  <p className="flex items-center justify-center gap-2 my-1 text-lg font-normal text-primary dark:text-gray-400">
                    <IoCall size={24} className="text-center" />
                    +8801923-868397
                  </p>
                  <p className="my-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Please tell us the Product Name
                  </p>
                  <p className="my-1 text-lg font-normal text-primary dark:text-gray-400">
                    Product Name: {singleProduct?.product_name} <br /> ID-
                    {singleProduct?._id}
                  </p>
                  <button
                    onClick={() => setShowCallNowModal(!showCallNowModal)}
                    data-modal-hide="popup-modal"
                    type="button"
                    className={`text-white bg-secondary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
                  >
                    Okay!
                  </button>
                  {/* <button onClick={() => setData(null)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{cancelActionName}</button> */}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default RightSideContactForm;
