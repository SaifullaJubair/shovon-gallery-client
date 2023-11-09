import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Loader from "../../Shared/Loader/Loader";
import AverageReview from "./AverageReview";
import { FaEdit, FaEllipsisV, FaTrash, FaUser } from "react-icons/fa";
import SubmitReview from "./SubmitReview";
import { BsStarFill } from "react-icons/bs";
import { Button, Dropdown, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

const ShowReview = ({ singleProduct }) => {
  const [refetch, setRefetch] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const { user, loading } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [editReview, setEditReview] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/all-review/${singleProduct?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [refetch, singleProduct]);

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

  const handleInputChange = (e) => {
    // Limit input to 300 characters
    if (e.target.value.length <= 250) {
      setReview(e.target.value);
    }
  };
  const remainingCharacters = 250 - review.length;

  const handleInputTitleChange = (e) => {
    // Limit input to 300 characters
    if (e.target.value.length <= 40) {
      setTitle(e.target.value);
    }
  };
  const remainingTitleCharacters = 40 - title.length;

  const handleReviewSubmit = () => {
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
    if (!review || !rating || !title) {
      toast.error("Please provide a review and rating before submitting.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Prepare the review data to be submitted
    const reviewData = {
      productId: singleProduct?._id,
      email: user?.email,
      title: title,
      review: review,
      rating: rating,
      postDate: formattedDate,
    };
    fetch(
      `http://localhost:5000/review/${singleProduct?._id}?email=${user?.email}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (
          data &&
          data.productId === singleProduct?._id &&
          data.email === user?.email
        ) {
          // review is already in the review collection, show a toast notification
          toast.error("This review is already added", {
            position: toast.POSITION.TOP_CENTER,
          });
          setReview("");
          setTitle("");
          setRating(0);
        } else {
          // Perform the API call to submit the review
          fetch("http://localhost:5000/submit-review", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(reviewData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                // Review submitted successfully, show a success toast notification
                toast.success("Review submitted successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });

                // Optionally, you can reset the review, rating, and title fields after submission
                setReview("");
                setTitle("");
                setRating(0);
                setRefetch(!refetch);

                //   setLoading(false);
              } else {
                toast.error("Invalid data provided", {
                  position: toast.POSITION.TOP_CENTER,
                });
                //   setLoading(false);
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        // Show an error toast notification if the submission fails
        // setLoading(false);
      });
  };

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

    const editReviewData = {
      _id: editData._id,
      productId: singleProduct?._id,
      email: user?.email,
      title: editTitle,
      review: editReview,
      rating: rating,
      postDate: formattedDate,
    };
    // console.log(editReviewData);
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

  const itemsPerPage = 6;

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
    // console.log(item);
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
    <div className="">
      <AverageReview></AverageReview>

      <div>
        <hr />
        <h1 className=" text-gray-700 font-semibold my-4">Product Reviews</h1>
        <hr />

        {currentItems
          ?.filter((item) => item?.user)
          .map((item) => (
            <div key={item?._id} className="">
              <div className="mx-2">
                <div className="flex items-center  justify-between">
                  <div className="flex items-center  my-4 ">
                    {item?.user ? (
                      <div>
                        <img
                          src={item?.user?.img}
                          alt=""
                          className="w-8 h-8 ring-1 ring-orange-500 rounded-full "
                        />
                      </div>
                    ) : (
                      <div>
                        <FaUser></FaUser>
                      </div>
                    )}
                    <h1 className="ml-4 text-gray-600 font-semibold">
                      {item?.user?.name}
                    </h1>
                  </div>
                  {item?.email === user?.email && (
                    <Dropdown
                      arrowIcon={false}
                      inline
                      label={<FaEllipsisV className="cursor-pointer mr-1" />}
                    >
                      <ul className="px-2 text-gray-500">
                        <li
                          className="flex items-center my-2 px-2 cursor-pointer  hover:text-secondary hover:underline"
                          onClick={() => showEditModal(item)}
                        >
                          <FaEdit className=" mr-1.5" /> Edit
                        </li>
                        <li
                          className="flex items-center mb-2 hover:text-red-500 hover:underline px-2 cursor-pointer"
                          onClick={() => showModal(item)}
                        >
                          <FaTrash className=" mr-1.5" /> Delete
                        </li>
                      </ul>
                    </Dropdown>
                  )}
                </div>

                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <BsStarFill
                      key={star}
                      className={`text-gray-300 text-lg ${
                        star <= item.rating ? "text-yellow-300 font-bold" : ""
                      }`}
                    />
                  ))}

                  <h3 className="ml-8 font-semibold">{item?.title}</h3>
                </div>
                <p className="my-3 max-w-2xl text-sm">{item?.review}</p>
                <p className="text-sm my-2.5 text-gray-500 ">
                  Reviewed on {item?.postDate.slice(0, 21)}
                </p>
              </div>

              <hr />
            </div>
          ))}
      </div>
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

      {/* <SubmitReview
        singleProduct={singleProduct}
        refetch={refetch}
      ></SubmitReview> */}

      <div>
        {/* Review submission form */}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <label
            for="Review title"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="Review title"
              className="w-full  p-2.5 py-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Write your review here..."
              value={title}
              onChange={handleInputTitleChange}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Review title
            </span>
          </label>
          <div className="text-right w-full mb-4 text-gray-500 text-sm">
            {remainingTitleCharacters} / 40
          </div>
          <textarea
            className="w-full h-24 p-2 border rounded-md "
            placeholder="Write your review here..."
            value={review}
            onChange={handleInputChange}
          />
          <div className="text-right w-full text-gray-500 text-sm">
            {remainingCharacters} / 250
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

          <Button gradientDuoTone="purpleToPink" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
        </div>
        {!user?.uid && (
          <div>
            <h1 className="m-2 mb-4">
              Please{" "}
              <Link to="/login" className="text-blue-500 font-semibold">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/register" className="text-blue-500 font-semibold">
                Register
              </Link>{" "}
              to submit your review.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowReview;
