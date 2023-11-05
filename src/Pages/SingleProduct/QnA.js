import { Button, Dropdown, Modal, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import {
  FaComment,
  FaEdit,
  FaEllipsisV,
  FaQuestionCircle,
  FaReply,
  FaTrash,
} from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Loader from "../../Shared/Loader/Loader";

const QnA = ({ singleProduct }) => {
  const [question, setQuestion] = useState("");
  const [qna, setQnA] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const [singleUser, setSingleUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    fetch("http://localhost:5000/all-qna")
      .then((res) => res.json())
      .then((data) => {
        setQnA(data);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [refetch]);

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
    fetch("http://localhost:5000/delete-qna", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Delete successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setDeleteData(null);
        setRefetch(!refetch);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const reply = form.replyQuestion.value;
    const data = {
      _id: editData?._id,
      reply,
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
        setEditData(null);
        setRefetch(!refetch);
      });
  };

  const handleInputChange = (e) => {
    // Limit input to 300 characters
    if (e.target.value.length <= 300) {
      setQuestion(e.target.value);
    }
  };
  const remainingCharacters = 300 - question.length;

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
  };

  if (loading) {
    <Loader />;
  }
  return (
    <div>
      <div>
        <div
          for="qna"
          className="block my-2 pl-2 bg-gray-50 p-2 w-full text-lg text-gray-700 font-medium dark:text-white"
        >
          Questions About This Product
        </div>
        {user?.uid ? (
          <div className="flex flex-col items-start my-6">
            <textarea
              id="qna"
              rows="4"
              value={question}
              onChange={handleInputChange}
              maxLength={300} // Set maximum length to 300 characters
              className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Ask seller a question about this product ..."
            ></textarea>
            <div className="text-right w-full text-gray-500 text-sm">
              {remainingCharacters} / 300
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
          <div>Please login</div>
        )}

        <div>
          <h1 className="text-lg bg-gray-50 p-2 text-gray-700 font-medium ">
            Other questions answered by Seller
          </h1>

          {/* Question and Answer */}
          {qna.map((item) => (
            <div key={item._id}>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center w-full  p-2">
                    <FaQuestionCircle className="text-blue-600" />{" "}
                    <h1 className="ml-3">{item.question}</h1>
                  </div>

                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={<FaEllipsisV className="cursor-pointer mr-1" />}
                  >
                    <ul className="px-2 text-gray-600">
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
                      <li
                        className="flex items-center my-2 px-2 cursor-pointer  hover:text-secondary hover:underline"
                        onClick={() => showEditModal(item)}
                      >
                        <FaComment className=" mr-1.5" /> Reply
                      </li>
                    </ul>
                  </Dropdown>
                </div>
                <div className="flex items-center p-2 ">
                  <BsChatDotsFill className="text-gray-600" />{" "}
                  <h1 className="ml-3 ">{item.reply}</h1>
                  <hr />
                </div>
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
                  <form onSubmit={handleEdit}>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to reply this ?
                    </h3>
                    {/* name input field  */}
                    <div className="mb-2">
                      <textarea
                        id="reply"
                        name="replyQuestion"
                        rows="4"
                        className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                        placeholder="Ask seller a question about this product ..."
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
      </div>
    </div>
  );
};

export default QnA;
