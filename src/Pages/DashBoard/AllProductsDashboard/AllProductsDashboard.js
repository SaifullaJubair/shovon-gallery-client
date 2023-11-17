import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import {
  FaEdit,
  FaEllipsisV,
  FaExternalLinkAlt,
  FaLink,
  FaMailBulk,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const AllProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [toggleStates, setToggleStates] = useState({});
  const { user, loading } = useContext(AuthContext);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const initialToggleStates = {};
        data.forEach((product) => {
          initialToggleStates[product._id] = product.product_status;
        });
        setToggleStates(initialToggleStates);
        setProducts(data);
      });
  }, [refetch]);

  const handleDeleteProduct = (product) => {
    fetch(`http://localhost:5000/singleproduct/${product?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          setRefetch(!refetch);
          toast(`${product?.product_name} Product deleted successfully`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setDeleteData(null);
        }
      });
  };

  const showModal = (product) => {
    setDeleteData(product);
    // console.log(product);
  };
  const onClose = () => {
    setDeleteData(null);
  };

  const handleToggle = async (product) => {
    try {
      const updatedFields = {
        product_status:
          toggleStates[product._id] === "Available"
            ? "Unavailable"
            : "Available",
      };

      const response = await fetch(
        `http://localhost:5000/update/product/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast(`${product?.product_name} product status change`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setRefetch(!refetch); // Trigger a data refetch after the update.
        setToggleStates((prevState) => ({
          ...prevState,
          [product._id]: updatedFields.product_status, // Update the toggle state for the specific product
        }));
      } else {
        console.error("Error updating product status:", data);
      }
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex mx-auto items-center text-gray-700 font-semibold text-2xl justify-center">
        <p>You have no products.</p>
      </div>
    ); // Message when there are no wishlist items
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
            <Table.HeadCell>Product Img</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Post Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems?.map((product, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={product.primary_img}
                    className="w-16 h-12 "
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{product.product_name}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.primary_color}</Table.Cell>
                <Table.Cell>{product.post_date.slice(0, 11)}</Table.Cell>
                <Table.Cell>
                  {/* toggle button */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={toggleStates[product._id] === "Available"}
                      onChange={() => handleToggle(product)}
                    />
                    <div
                      className={`${
                        toggleStates[product._id] === "Available"
                          ? "w-11 h-6 bg-green-500 rounded-full p-1 transition duration-300 ease-in-out"
                          : "w-11 h-6 bg-red-500 rounded-full p-1 transition duration-300 ease-in-out"
                      }`}
                    >
                      <div
                        className={`${
                          toggleStates[product._id] === "Available"
                            ? "translate-x-5"
                            : "translate-x-0"
                        } w-4 h-4 bg-white rounded-full shadow-md transform ring-0 transition-transform duration-300 ease-in-out`}
                      />
                    </div>
                    <span
                      className={`ml-3 text-xs font-medium ${
                        toggleStates[product._id] === "Available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {toggleStates[product._id] === "Available"
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </label>
                </Table.Cell>

                <Table.Cell className="ml-4" title="action">
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={<FaEllipsisV className="cursor-pointer mr-1" />}
                  >
                    <ul className="px-2 text-gray-600 font-semibold">
                      <>
                        <Link to={`/singleproduct/${product._id}`}>
                          <li className="flex items-center my-2 px-2 cursor-pointer  hover:text-blue-500 hover:underline">
                            <FaLink className="mr-2" />
                            Visit
                          </li>
                        </Link>
                        <Link to={`/dashboard/updateproduct/${product._id}`}>
                          <li className="flex items-center my-2 px-2 cursor-pointer  hover:text-secondary hover:underline">
                            <FaEdit className=" mr-2" /> Edit
                          </li>
                        </Link>
                        <li
                          className="flex items-center mb-2 hover:text-red-500 hover:underline px-2 cursor-pointer"
                          onClick={() => setDeleteData(product)}
                        >
                          <FaTrash className=" mr-2" /> Delete
                        </li>
                      </>
                    </ul>
                  </Dropdown>

                  {deleteData !== null && (
                    <div
                      id="popup-modal"
                      tabIndex="-1"
                      className="fixed flex items-center justify-center top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                    >
                      <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <button
                            onClick={() => setDeleteData(null)}
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
                            <svg
                              aria-hidden="true"
                              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this{" "}
                              {product.product_name} Product?
                            </h3>
                            <button
                              onClick={() => handleDeleteProduct(deleteData)}
                              data-modal-hide="popup-modal"
                              type="button"
                              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            >
                              Yes, I'm sure
                            </button>
                            <button
                              onClick={onClose}
                              data-modal-hide="popup-modal"
                              type="button"
                              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                              No, cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
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
  );
};

export default AllProductsDashboard;
