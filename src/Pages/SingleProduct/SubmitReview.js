import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const SubmitReview = ({ singleProduct }) => {
  const { user, loading } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
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
  const handleReviewSubmit = () => {
    // Validate the review, rating, and title (if required)
    if (!review || !rating) {
      toast.error("Please provide a review and rating before submitting.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Prepare the review data to be submitted
    const reviewData = {
      productId: singleProduct?._id,
      userId: user?.uid, // Assuming user is authenticated and user object is available
      review: review,
      rating: rating,
      postDate: formattedDate,
    };

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
          setRating(0);
          //   setLoading(false);
        } else {
          toast.error("Invalid data provided", {
            position: toast.POSITION.TOP_CENTER,
          });
          //   setLoading(false);
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
      <h1 className="bg-gray-50 p-2 my-4 text-lg font-semibold text-gray-700">
        Ratings & Reviews of {product_heading}
      </h1>
      {user?.uid ? (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
          <textarea
            className="w-full h-24 p-2 border rounded-md mb-4"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
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
      ) : (
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
