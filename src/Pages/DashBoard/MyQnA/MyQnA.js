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

const MyQnA = () => {
  const { user } = useContext(AuthContext);

  const [qna, setQnA] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [refetch, setRefetch] = useState(false);

  // console.log(editData?._id)

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/dashboard/all-qna/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setQnA(data);
          console.log(data);
        });
    }
  }, [user?.email, refetch]);

  const itemsPerPage = 8;

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
  return (
    <div className="flex w-full">
      <div className="mx-auto flex-grow overflow-x-auto">
        {qna ? (
          <h2 className="title uppercase p-10 text-center mb-10 bg-secondary text-white text-2xl font-semibold">
            My QnA{" "}
          </h2>
        ) : (
          <Loader></Loader>
        )}
        {qna?.length ? (
          <p></p>
        ) : (
          <p className="text-2xl mt-16 text-center text-orange-500 ">
            You have No QnA
          </p>
        )}

        {currentItems?.map((comment, index) => (
          <div className="grid lg:grid-cols-11 grid-cols-1 gap-2 bg-gray-100 my-4 py-4">
            <div className="lg:col-span-2  col-span-1 ml-2">
              <div className="flex items-center gap-2">
                <img
                  src={comment?.product?.primary_img}
                  className="h-16 w-16 rounded ring-1 ring-blue"
                  alt=""
                />
                <div>
                  <p>{comment?.product?.product_name}</p>
                  <p>{comment?.product?.category}</p>
                  <p>{comment?.product?.price}৳ </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7  col-span-1 mx-2 break-words">
              <p>
                Q:{" "}
                {comment?.question.length > 100
                  ? comment?.question.slice(0, 100) + "..."
                  : comment?.question}
              </p>
              <p>A: {comment?.reply}</p>
            </div>
            <div className="lg:col-span-2 col-span-1">
              <Link
                className="text-blue-400 truncate ... "
                to={`/singleproduct/${comment?.product_id}`}
              >
                <div className="mt-4">
                  <Button size="xs" outline={true}>
                    <FaExternalLinkAlt className="mr-2" /> Go to Product
                  </Button>{" "}
                </div>
              </Link>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default MyQnA;
