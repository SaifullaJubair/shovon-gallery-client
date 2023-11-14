import { Dropdown, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useContext } from "react";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaLink, FaTrash } from "react-icons/fa";

const MyOrders = () => {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    // Fetch division data from the backend when the component mounts
    fetch(`http://localhost:5000/orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOrders(data);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        // Handle fetch error if necessary
      });
  }, []);
  console.log(orders);

  if (isLoading || loading) {
    return <Loader />;
  }
  return (
    <div className="mx-auto w-full overflow-x-auto">
      <div className=" ">
        <h2 className="title uppercase p-10 text-center mb-10 bg-secondary text-white text-2xl font-semibold">
          All Users{" "}
        </h2>
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Product Details</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Order Date</Table.HeadCell>
            <Table.HeadCell>Delivered </Table.HeadCell>
            <Table.HeadCell>TransactionID</Table.HeadCell>
            <Table.HeadCell>Operations</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders?.map((order, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-800 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  {/* Product details */}
                  {order.cartProducts.map((product, productIndex) => (
                    <div key={productIndex} className="flex items-center gap-3">
                      <img
                        src={product.img}
                        className="w-16 h-16 ring-2 ring-secondary/40"
                        alt=""
                      />
                      <div className="my-4 text-xs">
                        <Link to={`/singleProduct/${product.productId}`}>
                          {" "}
                          <p className="py-1 hover:text-red-500 duration-100">
                            {product.heading}
                          </p>
                        </Link>
                        {product?.selectedColor ? (
                          <p>{product.selectedColor}</p>
                        ) : (
                          <p>{product.primary_color}</p>
                        )}
                        <div className="flex items-center gap-3 flex-grow pt-1">
                          <p>Qty: {product.quantity}</p>
                          <p>Price: {product.price}</p>
                          <p>Subtotal: {product.subtotal}</p>
                        </div>
                        <p className="text-xs pt-1.5">
                          OrderID:{" "}
                          <span className="font-semibold">{order._id}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </Table.Cell>
                <Table.Cell>{order.totalAmount}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <p className="text-xs">{order.postDate.slice(0, 23)}</p>{" "}
                </Table.Cell>
                <Table.Cell>{order.delivered ? "Yes" : "No"}</Table.Cell>
                <Table.Cell className="text-xs font-semibold">
                  {order.transactionId}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={<FaEllipsisV className="cursor-pointer mr-1" />}
                  >
                    <ul className="px-2 text-gray-500">
                      <>
                        <li className="flex items-center my-2 px-2 cursor-pointer  hover:text-secondary hover:underline">
                          <FaLink className=" mr-1.5" /> Edit
                        </li>
                        <li className="flex items-center mb-2 hover:text-red-500 hover:underline px-2 cursor-pointer">
                          <FaTrash className=" mr-1.5" /> Delete
                        </li>
                      </>
                    </ul>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MyOrders;
