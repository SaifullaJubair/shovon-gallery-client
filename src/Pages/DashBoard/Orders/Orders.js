import { Button, Dropdown, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useContext } from "react";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import {
  FaEllipsisV,
  FaLink,
  FaPlane,
  FaShip,
  FaShippingFast,
  FaTrash,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { ImSpinner3 } from "react-icons/im";
import { RiCheckDoubleFill } from "react-icons/ri";
import { toast } from "react-toastify";
const Orders = () => {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [itemOffset, setItemOffset] = useState(0);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    // Fetch division data from the backend when the component mounts
    fetch("http://localhost:5000/all-orders")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOrders(data);
        // console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        // Handle fetch error if necessary
      });
  }, [refetch]);

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const handleDeliveryStatusChange = (e, order) => {
    // Send a request to update the delivery status
    const newStatus = e.target.value;

    fetch(
      `http://localhost:5000/update-delivery-status/${order.transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delivered: newStatus }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Handle response data if needed
        setRefetch(!refetch);
        toast.success("DeliveryStatus update successful", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error updating delivery status:", error);
      });
  };

  if (isLoading || loading) {
    return <Loader />;
  }
  if (orders.length === 0) {
    return (
      <div className="flex mx-auto mt-72  text-gray-700 font-semibold text-2xl justify-center">
        <p>You have no Orders.</p>
      </div>
    ); // Message when there are no wishlist items
  }
  return (
    <div className="mx-auto w-full overflow-x-auto">
      <div className=" ">
        <h2 className="title uppercase p-10 text-center mb-10  text-gray-800 text-2xl font-semibold">
          All Orders{" "}
        </h2>
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Product Details</Table.HeadCell>
            <Table.HeadCell>User info</Table.HeadCell>
            <Table.HeadCell>Delivery Type & Status </Table.HeadCell>
            <Table.HeadCell>TransactionID</Table.HeadCell>
            <Table.HeadCell>View Payment</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems?.map((order, index) => (
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
                    <div
                      key={productIndex}
                      className=" flex items-center gap-4"
                    >
                      <div className="w-16 h-16">
                        <img
                          src={product.img}
                          className="w-16 h-16  ring-2 ring-secondary/40"
                          alt=""
                        />
                      </div>
                      <div className="mb-4 w-56 text-xs">
                        <Link
                          className="hover:text-red-500 duration-100"
                          to={`/singleProduct/${product.productId}`}
                        >
                          {" "}
                          <p className="py-1 ">{product.product_name}</p>
                          {product?.selectedColor ? (
                            <p>Color: {product.selectedColor}</p>
                          ) : (
                            <p>Color: {product.primary_color}</p>
                          )}
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <p>Qty: {product.quantity}</p>
                            <p>Price: {product.price}৳</p>
                            <p>Subt: {product.subtotal}৳</p>
                          </div>
                          <p className="py-1">Total: {order.totalAmount}৳</p>
                        </Link>
                        <p className="text-xs ">
                          OrderID:{" "}
                          <span className="font-semibold">{order._id}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </Table.Cell>
                {/* <Table.Cell></Table.Cell> */}
                <Table.Cell>
                  <div className="text-gray-700 ">
                    <p>{order.userName}</p>
                    <p>{order.userEmail}</p>
                    <p>{order.division}</p>
                    <p>{order.district}</p>
                    <p>{order.address}</p>
                    <p>{order.number}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <p className="uppercase mx-2 text-xs flex items-center font-semibold">
                    <FaShippingFast className="mr-1" /> {order?.deliveryType}{" "}
                    <span className="lowercase ml-[3px]"> DELIVERY</span>
                  </p>
                  <select
                    id="orderStatus"
                    className=" block pl-2 py-3  shadow-primary/10 px-0  text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer  "
                    onChange={(e) => handleDeliveryStatusChange(e, order)}
                  >
                    <option disabled selected defaultValue={order.delivered}>
                      {order.delivered}
                    </option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </Table.Cell>
                <Table.Cell className="text-xs font-semibold">
                  <p>TransID: {order.transactionId}</p>
                  <p className="text-xs mt-1">
                    {order.paymentDate?.slice(0, 23)}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/payment/success?transactionId=${order.transactionId}`}
                  >
                    <Button size="xs" color="success">
                      <FaLink className="mr-1"></FaLink>Visit
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="pagination my-6">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination-menu"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
