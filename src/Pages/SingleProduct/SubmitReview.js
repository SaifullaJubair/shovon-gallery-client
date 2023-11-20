import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const SubmitReview = ({ singleProduct, refetch }) => {
  const { user, loading } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [againFetch, setAgainFetch] = useState(false);
  //   const [isLoading, setLoading] = useState(true);
  const {
    _id,
    product_name,
    category,
    product_heading,
    box_content,
    primary_color,
    primary_img,
    price,
    available_color,

    product_highlight,
    details,
    feature_img1,
    feature_img2,
    post_date,
  } = singleProduct;
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
      `https://shovon-gallery-server.vercel.app/review/${singleProduct?._id}?email=${user?.email}`
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
        } else {
          // Perform the API call to submit the review
          fetch("https://shovon-gallery-server.vercel.app/submit-review", {
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
                setAgainFetch(!refetch);
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

  if (loading) {
    return <Loader />; // Show loader while data is being fetched or processed
  }
  return (
    <div>
      {/* Review submission form */}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
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
  );
};

export default SubmitReview;
