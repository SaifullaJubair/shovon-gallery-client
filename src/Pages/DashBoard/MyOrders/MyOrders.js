import { Button, Dropdown, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useContext } from "react";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaLink, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const MyOrders = () => {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch division data from the backend when the component mounts
    fetch(`http://localhost:5000/orders/${user.email}`)
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
  }, []);

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

  if (isLoading || loading) {
    return <Loader />;
  }
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex mx-auto items-center text-gray-700 font-semibold text-2xl justify-center">
        <p className="mt-[-100px]">You have no Order😊</p>
      </div>
    ); // Message when there are no wishlist items
  }
  return (
    <div className="mx-auto w-full overflow-x-auto">
      <div className=" ">
        <h2 className="title uppercase p-10 text-center mb-8  text-gray-800 text-2xl font-semibold">
          MY Orders{" "}
        </h2>
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Product Details</Table.HeadCell>
            <Table.HeadCell>Order Date</Table.HeadCell>
            <Table.HeadCell>Delivery Type </Table.HeadCell>
            <Table.HeadCell>Delivered </Table.HeadCell>
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
                    <div key={productIndex} className="flex items-center gap-4">
                      <div className="w-20 h-20">
                        <img
                          src={product.img}
                          className="w-20 h-20  ring-2 ring-secondary/40"
                          alt=""
                        />
                      </div>
                      <div className="text-xs w-64">
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
                          <p className="mt-1">
                            Total:{" "}
                            <span className="font-medium ">
                              {order.totalAmount}৳
                            </span>
                          </p>
                        </Link>
                        <p className="text-xs pt-1.5">
                          OrderID:{" "}
                          <span className="font-semibold">{order._id}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </Table.Cell>

                <Table.Cell>
                  {" "}
                  <p className="text-xs w-20">
                    {order.paymentDate.slice(0, 23)}
                  </p>{" "}
                </Table.Cell>
                <Table.Cell className="uppercase text-xs">
                  {order?.deliveryType} Delivery
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-gray-200 px-1.5 text-xs  py-1  rounded-xl">
                    {order.delivered}
                  </span>
                  <p className="text-xs pt-1">
                    {order?.deliveredDate?.slice(0, 12)}
                  </p>
                  <p></p>
                </Table.Cell>
                <Table.Cell className="text-xs font-semibold">
                  {order.transactionId}
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

export default MyOrders;
