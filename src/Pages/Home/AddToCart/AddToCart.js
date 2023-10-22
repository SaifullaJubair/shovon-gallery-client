import { Button, Table, Tooltip } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { BiArrowToRight, BiCart, BiHeart, BiTrash } from "react-icons/bi";
import { FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { Link } from "react-router-dom";
import Loader from "../../../Shared/Loader/Loader";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";


const AddToCart = () => {
  const [refetch, setRefetch] = useState(false);
  const [cartPosts, setCartPosts] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [deleteData, setDeleteData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/mycart/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCartPosts(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.email, refetch]);

  const handleDeletePost = (item) => {
    // console.log(post);
    fetch(
      `http://localhost:5000/cart/${item?.productId}?email=${user?.email}`,
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
          setRefetch(!refetch);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const onClose = () => {
    setDeleteData(null);
  };

  // calculate total amount

  useEffect(() => {
    let total = 0;
    cartPosts.forEach((item) => {
      const subtotal = item.product.price * item.quantity;
      total += subtotal;
    });
    setTotalAmount(total);
  }, [cartPosts]);

  const handleInputChange = (event, item) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);

    // Make a PUT/PATCH request to update the quantity in the cartCollection
    fetch(
      `http://localhost:5000/cart/${item?.productId}?email=${user?.email}`,
      {
        method: "PUT", // Use PUT or PATCH based on your API endpoint configuration
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Handle response data if needed
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  if (loading) {
    return <Loader />;
  }
  if (cartPosts.length === 0) {
    return (
      <div className="min-h-screen flex mx-auto items-center text-gray-700 font-semibold text-2xl justify-center">
        <p>You have no Cart products.</p>
      </div>
    ); // Message when there are no wishlist items
  }
  // console.log(cartPost);
  return (
    <div className="  ">
      <div className="flex flex-col max-w-4xl p-6 space-y-4 my-10 sm:p-10 mx-auto bg-gray-50 text-gray-800">
        <h2 className="text-xl font-semibold flex items-center gap-1">
          You have {cartPosts?.length} product in your cart <BiCart></BiCart>
        </h2>
        <ul className="flex flex-col divide-y divide-gray-300">
          {cartPosts?.map((item) => {
            const subtotal = item?.product?.price * item.quantity;
            return (
              <li
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
                key={item?._id}
              >
                <div className="grid grid:cols-1 md:grid-cols-7 lg:grid-cols-7 w-full space-x-2 sm:space-x-4">
                  <img
                    className="col-span-1 md:col-span-2 lg:col-span-2 w-full md:h-[200px] border-transparent rounded outline-none bg-gray-500"
                    src={item?.product?.primary_img}
                    alt={item?.product?.product_name}
                  />
                  <div className="col-span-1  md:col-span-4 lg:col-span-4 pb-4">
                    <Link to={`/singleproduct/${item?.productId}`}>
                      <div className="space-y-1">
                        <h3 className="lg:text-lg my-4 lg:my-0 md:my-0 md:text-md text-md max-w-md font-semibold leading-tight sm:pr-8 hover:text-orange-500 duration-100">
                          {item?.product?.product_heading}
                        </h3>
                        <p className="text-sm  text-gray-600">
                          {item?.product?.category}
                        </p>
                        {item?.selectedColor ? (
                          <p className="text-sm flex gap-1 items-center text-gray-600">
                            Color:
                            <div
                              className="w-4 h-4 rounded-full border  "
                              style={{ backgroundColor: item?.selectedColor }}
                            />
                            {item?.selectedColor}{" "}
                          </p>
                        ) : (
                          <p className="text-sm flex gap-1 items-center text-gray-600 ">
                            Color:{" "}
                            <div
                              className="w-4 h-4 rounded-full border  font-semibold "
                              style={{
                                backgroundColor: item?.product?.primary_color,
                              }}
                            />
                            <span className="font-semibold">
                              {" "}
                              {item?.product?.primary_color}{" "}
                            </span>
                          </p>
                        )}
                      </div>
                    </Link>
         
                    <div className="text-lg flex items-centers mt-1 ">
                      <p className="font-semibold">
                        {" "}
                        {item?.product?.price}
                        <span className="font-bold text-xl">৳</span>
                      </p>

                      <p className="mx-2.5 mt-1.5 text-sm">Quantity:</p>
                      <select
                        id="quantity"
                        className="block py-2  px-2 w-16 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                        onChange={(event) => handleInputChange(event, item)}
                      >
                        <option defaultValue={item?.quantity}>
                          {item?.quantity}
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <p className="text-gray-700">
                      Subtotal:{" "}
                      <span className="font-semibold">
                        {subtotal} <span className="font-bold text-xl">৳</span>{" "}
                      </span>
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-1 lg:col-span-1">
                    <div className="flex text-sm items-center   hover:text-red-600 ">
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                        onClick={() => setDeleteData(item)}
                      >
                        <BiTrash className="text-lg"></BiTrash>
                        <span>Remove</span>
                      </button>

                      {
                        // Delete Confirmation Modal
                        deleteData && (
                          <ConfirmationModal
                            message={`Are you sure to remove this ${item?.product?.product_name} product from cart?`}
                            data={deleteData}
                            setData={setDeleteData}
                            successAction={handleDeletePost}
                            successActionName="Yes, I'm Sure!"
                            cancelActionName="No, Cancel"
                            successBtnColor="red"
                          />
                        )
                      }
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="space-y-1 text-right">
          <p className="text-gray-600 font-semibold">
            Total amount:
            <span className="font-bold">
              {totalAmount} <span className="font-extrabold  text-sm">৳</span>
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <Link to="/allproducts">
            <button
              type="button"
              className=" md:px-4 px-2 py-2 border rounded-md border-orange-600"
            >
              Back to shop
            </button>
          </Link>
          <button
            type="button"
            className="px-4 py-2 border rounded-md bg-orange-600 text-gray-50 border-orange-600"
          >
            Checkout{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
