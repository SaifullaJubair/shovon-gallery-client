import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo & Cover Photo/Logo & Cover Photo/Shovon Gallery/Logo_Shovon Gallery_01.png";
import Loader from "../../Shared/Loader/Loader";
const PaymentSuccess = () => {
  const [order, setOrder] = useState({});
  const [isLoading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  useEffect(() => {
    // Fetch division data from the backend when the component mounts
    fetch(`http://localhost:5000/orders/by-transaction-id/${transactionId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOrder(data);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        // Handle fetch error if necessary
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col max-w-xl p-6 space-y-4  sm:p-10 divide-gray-300 bg-gray-50 text-gray-800 mx-auto my-16">
      <div className="font-bold  mb-4 cursor-pointer flex items-center font-[Poppins] text-gray-900">
        <img src={logo} alt="logo" className="lg:w-16 h-12 md:w-12 w-12" />
        <span className="text-gray-700 font-semibold ml-2 lg:text-lg md:text-sm text-lg">
          <span className="text-red-500 font-bold">S</span>hovon{" "}
          <span className="text-red-500 font-bold">G</span>allery
        </span>
      </div>
      <h1 className="text-2xl text-secondary font-semibold flex items-center justify-center my-2">
        Payment successful! <FaCheckCircle className="ml-1.5 text-green-300" />
      </h1>

      <div>
        <h1 className="text-xl font-semibold mt-6">Payment information</h1>
        <div className="text-sm my-4 text-gray-700">
          <p>
            OrderID: <span className="font-semibold">{order._id}</span>
          </p>
          <p className="my-1.5">
            TransactionID:{" "}
            <span className="font-semibold"> {order.transactionId}</span>
          </p>
          <p>
            Payment Date:{" "}
            <span className="font-semibold">
              {" "}
              {order.paymentDate.slice(0, 23)}
            </span>{" "}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold">Order items</h2>
      <hr />
      {order.cartProducts.map((item) => (
        <ul className="flex flex-col pt-4 space-y-2">
          <li className="flex items-start justify-between">
            <h3 className="text-sm max-w-sm mr-4">
              {item.heading}
              <span className=" text-orange-600">
                {" "}
                <x3>{item.quantity}</x3>(qty)
              </span>
            </h3>
            <div className="text-right mb-1">
              <span className="block">{item.subtotal}৳</span>
            </div>
          </li>
        </ul>
      ))}
      <hr />

      <div className="pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Discount</span>
          <span>0৳</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-3 h-3 mt-1 fill-current text-orange-500"
          >
            <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
            <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
          </svg>
          <span className="text-gray-600">Spend 5,000৳, get 20% off</span>
        </div>
        <div className="space-y-6 ">
          <div className="flex justify-between mt-6 mb-2">
            <span className="font-semibold text-lg">Total Amount</span>
            <span className="font-semibold">
              {order.totalAmount}
              <span className="font-bold text-xl">৳</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              className=" px-3 py-2 font-semibold border rounded bg-orange-600 text-gray-50 border-orange-600  print:hidden"
              onClick={() => window.print()}
            >
              Print Payment Info
            </button>
            <Link to="/dashboard/my-orders">
              <button
                type="button"
                className="px-3  py-2 font-semibold border rounded bg-secondary text-gray-50 print:hidden"
              >
                Visit Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
