import { Button, Dropdown, Modal, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import {
  FaComment,
  FaEdit,
  FaEllipsisV,
  FaQuestionCircle,
  FaTrash,
} from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Loader from "../../Shared/Loader/Loader";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const QnA = ({ singleProduct }) => {
  const [question, setQuestion] = useState("");
  const [qna, setQnA] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [replyData, setReplyData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const { user, loading } = useContext(AuthContext);
  const [singleUser, setSingleUser] = useState(null);

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
  useEffect(() => {
    fetch(`http://localhost:5000/all-qna/${singleProduct._id}`)
      .then((res) => res.json())
      .then((data) => {
        setQnA(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [refetch, singleProduct]);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data only if user is available and has an email
      fetch(`http://localhost:5000/singleuser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleUser(data);
        })
        .catch((error) => {
          // Handle fetch error if necessary
          console.error(error);
        });
    } else {
      // Handle case when user is not authenticated
      setSingleUser(null); // Set singleUser to null or an empty object
    }
  }, [user]);

  const handleDelete = (data) => {
    fetch(`http://localhost:5000/delete-qna`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: data._id,
        email: data.email, // Include user's email in the request body
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast("Delete successful", {
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

  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const question = form.editQuestion.value;
    const data = {
      _id: editData?._id,
      question,
      postDate: formattedDate,
    };
    fetch("http://localhost:5000/edit-question", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset("");
        toast("Edit successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setEditData(null);
        setRefetch(!refetch);
      });
  };
  const handleReply = (e) => {
    e.preventDefault();
    const form = e.target;
    const reply = form.replyQuestion.value;
    const data = {
      _id: replyData?._id,
      reply,
      replyDate: formattedDate,
    };
    fetch("http://localhost:5000/reply-question", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset("");
        toast("Edit successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setReplyData(null);
        setRefetch(!refetch);
      });
  };

  const handleInputChange = (e) => {
    // Limit input to 300 characters
    if (e.target.value.length <= 160) {
      setQuestion(e.target.value);
    }
  };
  const remainingCharacters = 160 - question.length;

  const handleAskQuestion = () => {
    // Check if user is logged in
    if (!user) {
      // Handle case when user is not logged in (e.g., show a login modal)
      return;
    }

    // Prepare question data
    const questionData = {
      email: singleUser.email,
      role: singleUser.role,
      product_id: singleProduct._id,
      question: question,
      postDate: formattedDate,
    };

    // Send the question to the backend API endpoint
    fetch("http://localhost:5000/ask-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend (e.g., show a success message)
        console.log("Question posted successfully:", data);
        toast.success("Question posted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setQuestion(""); // Reset the question input field
        setRefetch(!refetch);
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error("Error posting question:", error);
        toast.error("Error posting question:", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = qna.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(qna.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % qna.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const showModal = (item) => {
    setDeleteData(item);
    // console.log(item);
  };
  const showEditModal = (item) => {
    setEditData(item);
    // console.log(item);
  };
  const showReplyModal = (item) => {
    setReplyData(item);
    // console.log(item);
  };
  const onClose = () => {
    setDeleteData(null);
  };
  const onEditClose = () => {
    setEditData(null);
  };
  const onReplyClose = () => {
    setReplyData(null);
  };

  if (loading || isLoading) {
    return <Loader />; // Show loader while data is being fetched or processed
  }

  return (
    <div>
      <div>
        <div
          for="qna"
          className="block my-4 pl-2 bg-gray-50 p-2 w-full text-lg text-gray-700 font-medium dark:text-white"
        >
          Questions About This Product
        </div>
        {user?.uid ? (
          <div className="flex flex-col items-start my-6">
            <textarea
              id="qna"
              rows="3"
              value={question}
              onChange={handleInputChange}
              maxLength={160} // Set maximum length to 300 characters
              className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Ask seller a question about this product ..."
            ></textarea>
            <div className="text-right w-full text-gray-500 text-sm">
              {remainingCharacters} / 160
            </div>
            <button
              className="inline-block rounded bg-secondary px-4 mx-2 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring "
              type="button"
              onClick={handleAskQuestion}
            >
              Ask Question
            </button>
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
              to ask questions to seller
            </h1>
          </div>
        )}

        <div>
          <h1 className="text-lg bg-gray-50 p-2 text-gray-700 font-medium ">
            Other questions answered by Seller
          </h1>

          {/* Question and Answer */}
          {currentItems.map((item) => (
            <div key={item?._id}>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center  px-2 py-4 ">
                    <FaQuestionCircle className="text-blue-600 w-10 text-xl" />{" "}
                    <h1 className="pl-3 ">{item?.question}</h1>
                  </div>

                  {(singleUser?.role === "admin" ||
                    item?.email === singleUser?.email) && (
                    <Dropdown
                      arrowIcon={false}
                      inline
                      label={<FaEllipsisV className="cursor-pointer mr-1" />}
                    >
                      <ul className="px-2 text-gray-500">
                        {item?.email === singleUser?.email && (
                          <>
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
                          </>
                        )}

                        {singleUser?.role === "admin" && (
                          <li
                            className="flex items-center my-2 px-2 cursor-pointer hover:text-secondary hover:underline"
                            onClick={() => showReplyModal(item)}
                          >
                            {item?.reply ? (
                              <>
                                <FaComment className="mr-1.5" />
                                Edit Reply
                              </>
                            ) : (
                              <>
                                <FaComment className="mr-1.5" />
                                Reply
                              </>
                            )}
                          </li>
                        )}
                      </ul>
                    </Dropdown>
                  )}
                </div>
                <p className="text-gray-500 ml-4 pb-1 mr-2 text-xs">
                  {item?.postDate?.slice(0, 21)}
                </p>

                {/* {singleUser?.role === "admin" && (
                 <div className="flex items-center px-2 py-4">
                  <BsChatDotsFill className="text-gray-600 w-10 text-xl" />{" "}
                  <h1 className="ml-3 ">{item?.reply}</h1>
                </div>
                <p className="text-gray-600 ml-4 mr-2 pb-2 text-xs">
                  {item?.replyDate?.slice(0, 21)}
                </p>
             )} */}

                {item?.reply?.length > 0 && (
                  <>
                    <div className="flex items-center px-2 py-4">
                      <BsChatDotsFill className="text-gray-600 w-10 text-xl" />{" "}
                      <h1 className="ml-3 ">{item?.reply}</h1>
                    </div>
                    <p className="text-gray-600 ml-4 mr-2 pb-2 text-xs">
                      {item?.replyDate?.slice(0, 21)}
                    </p>
                  </>
                )}
                <hr />
              </div>
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
                  <form onSubmit={handleEdit}>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to edit this ?
                    </h3>
                    {/* name input field  */}
                    <div className="mb-2">
                      <textarea
                        id="editQuestion"
                        name="editQuestion"
                        defaultValue={editData?.question}
                        rows="4"
                        className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                        placeholder="Edit your question ..."
                      ></textarea>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                      <Button color="success" type="submit">
                        Yes, I'm sure
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
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
        {replyData !== null && (
          <div>
            <div>
              <Modal show={true} size="md" popup={true} onClose={onReplyClose}>
                <Modal.Header />
                <Modal.Body>
                  <form onSubmit={handleReply}>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to reply this ?
                    </h3>
                    {/* name input field  */}
                    <div className="mb-2">
                      <textarea
                        id="reply"
                        name="replyQuestion"
                        defaultValue={replyData?.reply}
                        rows="4"
                        className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                        placeholder="Answers to user questions ..."
                      ></textarea>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                      <Button color="success" type="submit">
                        Yes, I'm sure
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          setReplyData(null);
                        }}
                      >
                        No, cancel
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
      <div className="pagination mt-6">
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

export default QnA;
