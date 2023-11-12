import { Button, Modal, Table, Tooltip } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { BiArrowToRight, BiCart, BiHeart, BiTrash } from "react-icons/bi";
import { FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { Link } from "react-router-dom";
import Loader from "../../../Shared/Loader/Loader";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Select from "react-select";

const AddToCart = () => {
  const [refetch, setRefetch] = useState(false);
  const [cartPosts, setCartPosts] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [deleteData, setDeleteData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutData, setCheckoutData] = useState(null);
  const [singleUser, setSingleUser] = useState({});
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    // Fetch division data from the backend when the component mounts
    fetch("http://localhost:5000/bangladesh")
      .then((res) => res.json())
      .then((data) => {
        // Assuming the division data is stored in the 'divisions' property

        setDivisions(
          data.find((item) => item.name === "divisions")?.divisions || []
        );

        setDistricts(
          data.find((item) => item.name === "districts")?.districts || []
        );
      })
      .catch((error) => {
        console.error(error);
        // Handle fetch error if necessary
      });
  }, []);

  const handleCheckout = (data) => {
    const {
      userName,
      userEmail,
      division,
      district,
      address,
      totalAmount,
      number,
    } = data;
    console.log(data);

    // e.preventDefault();
    // const form = e.target;
    // const question = form.editQuestion.value;
    // const data = {
    //   _id: checkoutData?._id,
    //   question,
    //   // postDate: formattedDate,
    // };
    // fetch("http://localhost:5000/edit-question", {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     form.reset("");
    //     toast("Edit successful", {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //     setCheckoutData(null);
    //     setRefetch(!refetch);
    //   })
    // .catch((error) => {
    //   console.error("Error edit review:", error);
    //   // Show an error toast notification if the submission fails
    //   // setLoading(false);
    // });
  };
  const showCheckoutModal = (item) => {
    setCheckoutData(item);
    console.log(item);
  };
  console.log(checkoutData);
  const onClose = () => {
    setCheckoutData(null);
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
        <div className="flex flex-col divide-y divide-gray-300">
          {cartPosts
            ?.filter((item) => item.product)
            .map((item) => {
              const subtotal = item?.product?.price * item.quantity;
              return (
                <div key={item?._id}>
                  <ul>
                    <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                      <div className="grid grid:cols-1 md:grid-cols-7 lg:grid-cols-7 w-full space-x-2 sm:space-x-4">
                        <img
                          className="col-span-1 md:col-span-2 lg:col-span-2 w-full md:h-[200px]  border-transparent rounded outline-none bg-gray-500"
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
                                    style={{
                                      backgroundColor: item?.selectedColor,
                                    }}
                                  />
                                  {item?.selectedColor}{" "}
                                </p>
                              ) : (
                                <p className="text-sm flex gap-1 items-center text-gray-600 ">
                                  Color:{" "}
                                  <div
                                    className="w-4 h-4 rounded-full border  font-semibold "
                                    style={{
                                      backgroundColor:
                                        item?.product?.primary_color,
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

                            <p className="mx-3 mt-1.5 text-sm">Quantity:</p>
                            <select
                              id="quantity"
                              className="block py-2  px-2 w-16 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                              onChange={(event) =>
                                handleInputChange(event, item)
                              }
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
                            <span className=" ml-1.5 font-semibold">
                              {subtotal}{" "}
                              <span className="font-bold text-xl">৳</span>{" "}
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
                  </ul>
                </div>
              );
            })}
        </div>
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
          <Link to="/category/all">
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
            onClick={() => showCheckoutModal(totalAmount)}
          >
            Checkout{" "}
          </button>
        </div>

        {checkoutData !== null && (
          <div>
            <div>
              <Modal show={true} size="xl" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                  <form onSubmit={handleSubmit(handleCheckout)}>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Checkout
                    </h3>

                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.userName
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("userName", { required: true })}
                      />

                      <label
                        for="floating_name"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Your Name
                      </label>
                      {errors.userName && (
                        <span className="text-xs text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="relative w-full mb-6 group">
                      <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.userName
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("userEmail", { required: true })}
                      />

                      <label
                        for="floating_email"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Your email
                      </label>
                      {errors.userEmail && (
                        <span className="text-xs text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="relative w-full mb-6 group">
                      <label
                        for="division"
                        className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Division
                      </label>

                      {/* <Select
                        id="division"
                        // className="block py-2.5 px-3 w-full "
                        className="basic-single"
                        classNamePrefix="select"
                        options={divisions.map((division) => ({
                          value: division.name,
                          label: division.name,
                        }))}
                        placeholder="Select Division"
                        {...register("division", { required: true })}
                      /> */}

                      <select
                        id="division"
                        className="block py-3 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                        {...register("division", { required: true })}
                      >
                        <option disabled selected>
                          Select Division
                        </option>
                        {divisions.map((division) => (
                          <option key={division._id} value={division.name}>
                            {division.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative w-full mb-6 group">
                      <label
                        for="district"
                        className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        District
                      </label>
                      <select
                        id="district"
                        className="block py-2.5 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                        {...register("district", { required: true })}
                      >
                        <option disabled selected>
                          Select District
                        </option>
                        {districts.map((district) => (
                          <option key={district._id} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_address"
                        id="floating_address"
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.address
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("address", { required: true })}
                      />
                      <label
                        for="floating_address"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Address
                      </label>
                      {errors.address && (
                        <span className="text-xs text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="relative w-full mb-6 group">
                      <input
                        type="number"
                        name="floating_number"
                        id="floating_number"
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.number
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("number", { required: true })}
                      />
                      <label
                        for="floating_number"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Number
                      </label>
                      {errors.number && (
                        <span className="text-xs text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col  divide-gray-300">
                      {cartPosts
                        ?.filter((item) => item.product)
                        .map((item) => {
                          const subtotal = item?.product?.price * item.quantity;
                          return (
                            <div key={item?._id}>
                              <ul>
                                <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                  <div className="grid grid:cols-6 md:grid-cols-7 lg:grid-cols-7 w-full space-x-2 sm:space-x-4">
                                    <img
                                      className="col-span-1 my-2 mx-1 md:col-span-1 lg:col-span-1 w-20 h-16 border-transparent rounded outline-none bg-gray-500"
                                      src={item?.product?.primary_img}
                                      alt={item?.product?.product_name}
                                    />
                                    <div className="col-span-4  md:col-span-5 lg:col-span-5 pb-4">
                                      <div className="space-y-1">
                                        <h3 className="text-sm">
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
                                              style={{
                                                backgroundColor:
                                                  item?.selectedColor,
                                              }}
                                            />
                                            {item?.selectedColor}{" "}
                                          </p>
                                        ) : (
                                          <p className="text-sm flex gap-1 items-center text-gray-600 ">
                                            Color:{" "}
                                            <div
                                              className="w-4 h-4 rounded-full border  font-semibold "
                                              style={{
                                                backgroundColor:
                                                  item?.product?.primary_color,
                                              }}
                                            />
                                            <span className="font-semibold">
                                              {" "}
                                              {
                                                item?.product?.primary_color
                                              }{" "}
                                            </span>
                                          </p>
                                        )}
                                      </div>

                                      <div className="text-lg flex items-centers mt-1 ">
                                        <p className="font-semibold">
                                          {" "}
                                          {item?.product?.price}
                                          <span className="font-bold text-xl">
                                            ৳
                                          </span>
                                        </p>

                                        <p className="mx-3 mt-1.5 text-sm">
                                          Qty: {item?.quantity}
                                        </p>
                                      </div>
                                      <p className="text-gray-700 text-sm">
                                        Subtotal:{" "}
                                        <span className=" ml-1.5 font-semibold">
                                          {subtotal}{" "}
                                          <span className="font-bold text-xl">
                                            ৳
                                          </span>{" "}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                      <p className="text-gray-600 font-semibold">
                        Total amount:
                        <span className="font-bold">
                          {totalAmount}
                          <span className="font-extrabold  text-sm">৳</span>
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                      <Button color="success" type="submit">
                        Yes, I'm sure
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          setCheckoutData(null);
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

export default AddToCart;
