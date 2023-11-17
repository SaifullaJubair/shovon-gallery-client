import { Button, Table, Tooltip } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { Link } from "react-router-dom";
import Loader from "../../../Shared/Loader/Loader";
import ReactPaginate from "react-paginate";

const MyWishlist = () => {
  const [refetch, setRefetch] = useState(false);
  const [wishlistPosts, setWishlistPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [deleteData, setDeleteData] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/mywishlist/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setWishlistPosts(data);
        });
    }
  }, [user?.email, refetch]);

  const handleDeletePost = (item) => {
    // console.log(post);
    fetch(
      `http://localhost:5000/wishlist/${item?.productId}?email=${user?.email}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Check if deletion was successful
        if (data.deletedCount > 0) {
          setDeleteData(false);
          toast.error("Product remove successfully from Wishlist!", {
            position: toast.POSITION.TOP_CENTER,
          });

          setRefetch(!refetch);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };
  const onClose = () => {
    setDeleteData(null);
  };
  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = wishlistPosts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(wishlistPosts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % wishlistPosts.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  // if (wishlistPosts === null) {
  //   return (
  //     <div>
  //       <Loader></Loader>
  //     </div>
  //   ); // You can show a loading indicator
  // }

  if (wishlistPosts.filter((item) => item.product).length === 0) {
    return (
      <div className="min-h-screen flex mx-auto items-center text-gray-700 font-semibold text-2xl justify-center">
        <p>You have no wishlist products.</p>
      </div>
    ); // Message when there are no wishlist items
  }

  // console.log(wishlistPosts);
  return (
    <div className="flex-1">
      <div className="mx-auto flex-grow overflow-x-auto">
        <h2 className="title uppercase p-10 text-center mb-10 bg-secondary text-white text-2xl font-semibold">
          My Wishlist{" "}
        </h2>

        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Seller Name</Table.HeadCell>
            <Table.HeadCell>Seller Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {wishlistPosts
              .filter((item) => item.product) // Filter out items without product data
              .map((item, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={item?.product?.primary_img}
                      className="h-12 w-16"
                      alt=""
                    />
                  </Table.Cell>
                  <Table.Cell>{item?.product?.product_name}</Table.Cell>
                  <Table.Cell>{item?.product?.category}</Table.Cell>
                  <Table.Cell>
                    <Tooltip content={item?.product?.primary_color}>
                      <div
                        className="w-6 h-6 rounded-full border border-orange-500 "
                        style={{
                          backgroundColor: item?.product?.primary_color,
                        }}
                      ></div>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>{item?.product?.product_status}</Table.Cell>
                  <Table.Cell>${item?.product?.price}</Table.Cell>
                  <Table.Cell className="flex gap-3">
                    <Link to={`/singleproduct/${item?.product?._id}`}>
                      <Button size="xs" color="success">
                        <BiArrowToRight
                          className="mr-2"
                          size={16}
                        ></BiArrowToRight>{" "}
                        Visit
                      </Button>
                    </Link>

                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => setDeleteData(item)}
                    >
                      <FaTrash className="mr-2"></FaTrash> Remove
                    </Button>

                    {
                      // Delete Confirmation Modal
                      deleteData && (
                        <ConfirmationModal
                          message={`Are you sure to delete this post?`}
                          data={deleteData}
                          setData={setDeleteData}
                          successAction={handleDeletePost}
                          successActionName="Yes, I'm Sure!"
                          cancelActionName="No, Cancel"
                          successBtnColor="red"
                        />
                      )
                    }
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

export default MyWishlist;
