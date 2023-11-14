import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Modal,
  Select,
  Table,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { toast } from "react-toastify";

import {
  FaEdit,
  FaEllipsisV,
  FaExternalLinkAlt,
  FaLink,
  FaMailBulk,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import ReactPaginate from "react-paginate";
import Loader from "../../../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

const MyReviewDashboard = () => {
  const [refetch, setRefetch] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const { user, loading } = useContext(AuthContext);

  const [editReview, setEditReview] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [rating, setRating] = useState(0);

  // console.log(editData?._id)

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myreview/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          //   console.log(data);
        });
    }
  }, [user?.email, refetch]);

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Dhaka", // Set the time zone to Bangladesh
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  const handleEdit = () => {
    if (!user) {
      toast.error(
        "Please Login or Register before submitting a review and rating.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }
    // Validate the review, rating, and title (if required)
    if (!editReview || !rating) {
      toast.error("Please provide a review and rating before submitting.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    console.log("Edit data", editData);
    const editReviewData = {
      _id: editData._id,
      productId: editData.productId,
      email: user?.email,
      title: editTitle,
      review: editReview,
      rating: rating,
      postDate: formattedDate,
    };
    // console.log("editReviewData", editReviewData);
    fetch("http://localhost:5000/edit-review", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editReviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          // Review submitted successfully, show a success toast notification
          toast.success("Review submitted successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setEditData(null);
          setEditReview("");
          setEditTitle("");
          setRating(0);
          setRefetch(!refetch);
        } else {
          toast.error("Invalid data provided", {
            position: toast.POSITION.TOP_CENTER,
          });
          //   setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error edit review:", error);
        // Show an error toast notification if the submission fails
        // setLoading(false);
      });
  };

  const handleDelete = (data) => {
    fetch(`http://localhost:5000/delete-review`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: data._id,
        email: data?.email, // Include user's email in the request body
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.error("Delete successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          setDeleteData(null);
          setRefetch(!refetch);
        } else {
          // Handle unauthorized or item not found case here
          toast.error("Unauthorized or item not found", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        // Handle errors if necessary
        console.error(error);
      });
  };

  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const handleEditTextAreaChange = (e) => {
    if (e.target.value.length <= 250) {
      setEditReview(e.target.value);
    }
  };
  const remainingEditTextAriaCharacters = 250 - editReview.length;

  const handleEditInputTitleChange = (e) => {
    if (e.target.value.length <= 40) {
      setEditTitle(e.target.value);
    }
  };
  const remainingEditTitleCharacters = 40 - editTitle.length;
  const showModal = (item) => {
    setDeleteData(item);
    // console.log(item);
  };
  const showEditModal = (item) => {
    setEditData(item);
    console.log(item);
  };

  const onClose = () => {
    setDeleteData(null);
  };
  const onEditClose = () => {
    setEditData(null);
    setEditReview("");
    setEditTitle("");
    setRating(0);
  };

  if (loading) {
    return <Loader />; // Show loader while data is being fetched or processed
  }
  return (
    <div className="flex w-full">
      <div className="mx-auto flex-grow overflow-x-auto">
        {reviews?.filter((item) => item.product) ? (
          <h2 className="title uppercase p-10 text-center mb-10 bg-secondary text-white text-2xl font-semibold">
            My Reviews{" "}
          </h2>
        ) : (
          <Loader></Loader>
        )}
        {reviews?.filter((item) => item.product).length ? (
          <p></p>
        ) : (
          <p className="text-2xl mt-16 text-center text-orange-500 ">
            You have No Reviews
          </p>
        )}

        {currentItems
          ?.filter((item) => item.product)
          .map((review, i) => (
            <div
              className="flex items-center justify-between px-2 my-4 py-4 bg-gray-50"
              key={review._id}
            >
              <div className="grid lg:grid-cols-11 grid-cols-1 gap-4 w-full  py-4">
                <div className="lg:col-span-4  col-span-1 ml-2">
                  <div className="flex lg:flex-row md:flex-row flex-col">
                    <img
                      src={review?.product?.primary_img}
                      className="lg:h-28 lg:w-28 md:w-40 md:h-32 h-36 w-40 rounded ring-1 ring-blue"
                      alt=""
                    />
                    <div className="text-sm py-1 ms-2">
                      <p>{review?.product?.product_name}</p>
                      <p className="my-1">{review?.product?.category}</p>
                      <p className="mb-1">{review.product.primary_color}</p>
                      <p>{review?.product?.price}৳ </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7  text-sm col-span-1 lg:mx-2 md:mx-8 mx-2 break-words">
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <BsStarFill
                        key={star}
                        className={`text-gray-300 text-lg ${
                          star <= review.rating
                            ? "text-yellow-300 font-bold"
                            : ""
                        }`}
                      />
                    ))}

                    <h3 className="ml-8  font-semibold ">{review?.title}</h3>
                  </div>
                  <p className="text-gray-500 my-2 text-sm">
                    {review.postDate.slice(0, 23)}
                  </p>
                  <p className="max-w-lg"> {review?.review}</p>
                </div>
                {/* <div className="lg:col-span-1 col-span-1">
                <Link
                  className="text-blue-400 truncate ... "
                  to={`/singleproduct/${review?.product_id}`}
                >
                  <div className="mt-4">
                    <Button size="xs" outline={true}>
                      <FaExternalLinkAlt className="mr-2" /> Go to Product
                    </Button>{" "}
                  </div>
                </Link>
              </div> */}
              </div>
              <Dropdown
                arrowIcon={false}
                inline
                label={<FaEllipsisV className="cursor-pointer mr-1" />}
              >
                <ul className="px-2 text-gray-500">
                  <li
                    className="flex items-center my-2 px-2 cursor-pointer  hover:text-secondary hover:underline"
                    onClick={() => showEditModal(review)}
                  >
                    <FaEdit className=" mr-1.5" /> Edit
                  </li>
                  <li
                    className="flex items-center mb-2 hover:text-red-500 hover:underline px-2 cursor-pointer"
                    onClick={() => showModal(review)}
                  >
                    <FaTrash className=" mr-1.5" /> Delete
                  </li>
                  <li className=" mb-2 hover:text-blue-500 hover:underline px-2 cursor-pointer">
                    <Link to={`/singleproduct/${review?.productId}`}>
                      <button className="flex items-center text-sm">
                        <FaExternalLinkAlt className="mr-2 " /> Go to Product
                      </button>{" "}
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          ))}

        {deleteData !== null && (
          <div>
            <div>
              <Modal show={true} size="md" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this ?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        onClick={() => handleDelete(deleteData)}
                      >
                        Yes, I'm sure
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          setDeleteData(null);
                        }}
                      >
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}

        {editData !== null && (
          <div>
            <div>
              <Modal show={true} size="md" popup={true} onClose={onEditClose}>
                <Modal.Header />
                <Modal.Body>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold mb-4">
                      Edit your Review
                    </h3>
                    <label
                      for="Edit Review title"
                      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Edit Review title"
                        className="w-full  p-2.5 py-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Write your review here..."
                        value={editTitle}
                        onChange={handleEditInputTitleChange}
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Review title (Optional)
                      </span>
                    </label>
                    <div className="text-right w-full mb-4 text-gray-500 text-sm">
                      {remainingEditTitleCharacters} / 40
                    </div>
                    <textarea
                      className="w-full h-24 p-2 border rounded-md "
                      placeholder="Write your review here..."
                      value={editReview}
                      onChange={handleEditTextAreaChange}
                    />
                    <div className="text-right w-full text-gray-500 text-sm">
                      {remainingEditTextAriaCharacters} / 250
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="mr-2 font-semibold">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <BsStarFill
                          key={star}
                          className={`text-gray-300 text-xl cursor-pointer ${
                            star <= rating ? "text-yellow-300 font-bold" : ""
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-8">
                    <Button gradientDuoTone="purpleToPink" onClick={handleEdit}>
                      Submit Review
                    </Button>

                    <Button
                      color="gray"
                      onClick={() => {
                        setEditData(null);
                      }}
                    >
                      No, cancel
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
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

export default MyReviewDashboard;
