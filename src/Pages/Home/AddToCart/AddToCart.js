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
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [deliveryType, setDeliveryType] = useState("home");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://shovon-gallery-server.vercel.app/mycart/${user?.email}`)
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
      `https://shovon-gallery-server.vercel.app/cart/${item?.productId}?email=${user?.email}`,
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
      `https://shovon-gallery-server.vercel.app/cart/${item?.productId}?email=${user?.email}`,
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
      fetch(`https://shovon-gallery-server.vercel.app/singleuser/${user.email}`)
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
    fetch("https://shovon-gallery-server.vercel.app/bangladesh")
      .then((res) => res.json())
      .then((data) => {
        // Assuming the division data is stored in the 'divisions' property

        setDivisions(
          data.find((item) => item.name === "divisions")?.data || []
        );
        // console.log(divisions);
        setDistricts(
          data.find((item) => item.name === "districts")?.data || []
        );
        // console.log(districts);
      })
      .catch((error) => {
        console.error(error);
        // Handle fetch error if necessary
      });
  }, []);

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
  const handleCheckout = async (data) => {
    if (!selectedDivision || !selectedDistrict) {
      toast.error("Please select both division and district.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const checkoutData = {
      userName: data.userName,
      userEmail: user.email,
      division: data.division,
      district: data.district,
      address: data.address,
      number: data.number,
      deliveryType: deliveryType,
      checkoutDate: formattedDate,
      cartProducts: cartPosts
        ?.filter((item) => item.product)
        .map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedColor: item?.selectedColor,
          primary_color: item?.product?.primary_color,
          category: item.product.category,
          price: item.product.price,
          product_name: item.product.product_name,
          img: item.product.primary_img,
          heading: item.product.product_heading,
          subtotal: item.product.price * item.quantity,
        })),
      totalAmount,
    };

    try {
      const response = await fetch(
        "https://shovon-gallery-server.vercel.app/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutData),
        }
      );

      const result = await response.json();
      window.location.replace(result.url);
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle error if necessary

      // Show error toast
      toast.error("Checkout Unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const validateBangladeshiMobileNumber = (value) => {
    // Regular expression for Bangladeshi mobile numbers
    const mobileNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    return mobileNumberRegex.test(value);
  };

  const showCheckoutModal = (item) => {
    setCheckoutData(item);
    // console.log(item);
  };
  // console.log(checkoutData);
  const onClose = () => {
    setCheckoutData(null);
  };

  if (loading) {
    return <Loader />;
  }
  if (cartPosts.length === 0) {
    return (
      <section className="flex items-center h-full sm:p-16 bg-gray-50 text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className="w-40 h-40 text-gray-400"
          >
            <path d="M14.1 8.5L12 6.4 9.9 8.5 8.5 7.1 10.6 5 8.5 2.9l1.4-1.4L12 3.6l2.1-2.1 1.4 1.4L13.4 5l2.1 2.1-1.4 1.4M7 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m10 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m-9.8-3.2c0 .1.1.2.2.2H19v2H7c-1.1 0-2-.9-2-2 0-.4.1-.7.2-1l1.3-2.4L3 4H1V2h3.3l4.3 9h7l3.9-7 1.7 1-3.9 7c-.3.6-1 1-1.7 1H8.1l-.9 1.6v.2z" />
          </svg>
          <p className="text-3xl">
            Looks like you have no products in your cart!
          </p>
          <Link
            to="/category/all"
            rel="noopener noreferrer"
            href="#"
            className="px-8 py-3 font-semibold rounded bg-orange-600 text-gray-50 hover:scale-105 duration-100"
          >
            Back to shopping
          </Link>
        </div>
      </section>
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
                    {/* User name */}
                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        defaultValue={singleUser?.name}
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

                    {/*division */}
                    <div className="relative w-full mb-6 group">
                      <label
                        for="division"
                        className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Division
                      </label>

                      <select
                        id="division"
                        className="block py-3 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                        {...register("division", { required: true })}
                        onChange={(e) => {
                          setSelectedDivision(e.target.value);
                        }}
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
                    {/* districts */}
                    <div className="relative w-full mb-6 group">
                      <label
                        for="district"
                        className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        District
                      </label>
                      <select
                        id="district"
                        className={`block py-2.5 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer ${
                          errors.district
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        {...register("district", { required: true })}
                        onChange={(e) => {
                          setValue("district", e.target.value);
                          setSelectedDistrict(e.target.value);
                        }}
                      >
                        <option disabled selected>
                          Select District
                        </option>
                        {districts
                          .filter(
                            (district) =>
                              district.division_name === selectedDivision
                          )
                          .map((district) => (
                            <option key={district._id} value={district.name}>
                              {district.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    {/* Radio button group for DeliveryType */}
                    <p className="text-gray-600 my-2 ">Chose Delivery type</p>
                    <div className="flex items-center mb-6">
                      <input
                        type="radio"
                        id="homeDelivery"
                        name="deliveryType"
                        value="home"
                        checked={deliveryType === "home"}
                        onChange={() => setDeliveryType("home")}
                        className="mr-2"
                      />
                      <label
                        htmlFor="homeDelivery"
                        className="mr-4 cursor-pointer"
                      >
                        Home Delivery
                      </label>

                      <input
                        type="radio"
                        id="courier"
                        name="deliveryType"
                        value="courier"
                        checked={deliveryType === "courier"}
                        onChange={() => setDeliveryType("courier")}
                        className="mr-2"
                      />
                      <label htmlFor="courier" className="cursor-pointer">
                        Courier
                      </label>
                    </div>
                    {/* Your Address */}
                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_address"
                        id="floating_address"
                        defaultValue={
                          deliveryType === "home" ? singleUser?.address : ""
                        }
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.address
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("address", { required: true })}
                      />

                      {/* Conditional label based on deliveryType */}
                      <label
                        htmlFor="floating_address"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        {deliveryType === "home"
                          ? "Your Home Address"
                          : "Provide courier name & address"}
                      </label>

                      {errors.address && (
                        <span className="text-xs text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_number"
                        id="floating_number"
                        defaultValue={singleUser?.mobileNumber}
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.number
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("number", {
                          required: "This field is required",
                          validate: {
                            isBangladeshiMobileNumber: (value) =>
                              validateBangladeshiMobileNumber(value) ||
                              "Invalid Bangladeshi mobile number",
                          },
                        })}
                      />

                      <label
                        htmlFor="floating_number"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Number
                      </label>
                      {errors.number && (
                        <span className="text-xs text-red-500">
                          {errors.number.message}
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
