import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import DatePicker from "tailwind-datepicker-react";
// import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Dropdown } from "flowbite-react";
const colorOptions = [
  "Red",
  "Blue",
  "Green",
  // Add more color options here
];

function AddProducts() {
  const [selectedColors, setSelectedColors] = useState([]);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleColorChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedColors(selectedOptions);
  };
  // const options = {
  //   title: "Registered Date",
  //   autoHide: true,
  //   todayBtn: false,
  //   clearBtn: true,
  //   // maxDate: new Date("2030-01-01"),
  //   maxDate: new Date(),
  //   minDate: new Date("1950-01-01"),
  //   theme: {
  //     background: "bg-white dark:bg-gray-800",
  //     todayBtn: "",
  //     clearBtn: "",
  //     icons: "",
  //     text: "",
  //     disabledText: "bg-red-500 text-white",
  //     input: "",
  //     inputIcon: "",
  //     selected: "",
  //   },
  //   icons: {
  //     // () => ReactNode | JSX.Element
  //     prev: () => <span className="font-semibold text-sm "> Previous</span>,
  //     next: () => <span className="font-semibold text-sm "> Next</span>,
  //   },
  //   datepickerClassNames: "top-12 ",
  //   defaultDate: new Date(Date.now()),
  //   language: "en",
  // };

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productPurpose, setProductPurpose] = useState("toRent");
  const [defineOption, setDefineOption] = useState("commercial");
  const [errPrice, setErrPrice] = useState(0);
  const [errSize, setErrSize] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (selectedDate) => {
    setDate(new Date(selectedDate).toISOString());
  };

  const handleAddProduct = async (data) => {
    const {
      areaType,
      balcony,
      bathroom,
      category,
      floor,
      location,
      ownerName,
      phone,
      productHeading,
      productName,
      description,
      purpose,
      room,
      size,
      price,
      upload,
      featureImage,
      division,
    } = data;

    const status = data.status || "complete";

    const productImage = upload[0];
    const featureImageInput = featureImage[0];

    const productFormData = new FormData();
    const featureFormData = new FormData();
    productFormData.append("image", productImage);
    featureFormData.append("image", featureImageInput);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const productImageConfig = {
      method: "POST",
      body: productFormData,
    };

    const featureImageConfig = {
      method: "POST",
      body: featureFormData,
    };

    try {
      setLoading(true);
      const productImgBbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        productImageConfig
      );

      const productImgBbData = await productImgBbRes.json();
      // feature image post
      const featureImgBbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        featureImageConfig
      );

      const featureImgBbData = await featureImgBbRes.json();

      if (!productImgBbData.success && !featureImgBbData.success) return;
      let myuuid = uuidv4();
      const product = {
        product_uid: myuuid,
        area_type: areaType,
        product_type: category,
        location,
        owner_name: ownerName,
        user_email: user?.email,
        user_image: user?.photoURL,
        user_name: user?.displayName,
        phone,
        price,
        product_heading: productHeading,
        product_name: productName,
        details: description,
        product_condition: purpose,
        size,
        registered: new Date(date).toISOString(),
        division,
        variants: [
          {
            floor,
            room,
            balcony,
            bathroom,
            feature_img: featureImgBbData.data.url,
          },
        ],
        completation_status: status,
        product_picture: productImgBbData.data.url,
        post_date: new Date().toISOString(),
        advertised: false,
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${localStorage.getItem(fareBD-token)}`,
        },
        body: JSON.stringify(product),
      };

      const res = await fetch("http://localhost:5000/products", config);
      const data = await res.json();

      if (data.acknowledged) {
        setLoading(false);
        navigate(from, { replace: true });

        toast.success(
          `Hey ${user?.displayName}! your product registered successfully`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } catch (err) {
      setLoading(false);
      // console.error(err);
    }
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="flex">
      {/* <DashboardSideBar></DashboardSideBar> */}

      <div className="  max-w-[768px] w-[95%] mx-auto">
        <h2 className="title uppercase p-8 text-center mb-8 bg-secondary text-white text-2xl font-semibold">
          Add Your Product
        </h2>

        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="p-4 rounded-sm shadow-md shadow-primary/10"
        >
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.productName
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("productName", { required: true })}
              />

              <label
                for="floating_name"
                className="peer-focus:font-medium absolute text-sm pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
              {errors.productName && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="relative w-full mb-6 group">
              <label
                for="category"
                className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Category
              </label>
              <select
                id="category"
                className="block py-2.5 shadow-md pl-2 shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                {...register("category", { required: true })}
              >
                <>
                  <option selected value="">
                    Select Category
                  </option>
                  <option value="office">Office</option>
                  <option value="floor">Floor</option>
                  <option value="duplex">Duplex</option>
                  <option value="building">Building</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="shop">Shop</option>
                  <option value="appartment">Appartment</option>
                  <option value="plaza">Plaza</option>
                  <option value="plot">Plot</option>
                  <option value="factory">Factory</option>
                </>
              </select>
            </div>
          </div>
          {/* <div className="relative w-full mb-6 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.ownerName
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("ownerName", { required: true })}
              />
              <label
                for="floating_name"
                className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                পণ্যের নাম বাংলায়
              </label>
              {errors.ownerName && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div> */}

          <div className="relative w-full mb-6 group">
            <input
              type="text"
              name="floating_heading"
              id="floating_heading"
              className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                errors.productHeading
                  ? "focus:border-red-500 border-red-500"
                  : "focus:border-secondary"
              }`}
              placeholder=" "
              {...register("productHeading", { required: true })}
            />
            <label
              for="floating_heading"
              className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Heading
            </label>
            {errors.productHeading && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <input
                onKeyUp={(e) => setErrPrice(e.target.value)}
                type="number"
                min="1"
                name="floating_price"
                id="floating_price"
                className={`block py-2.5 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 peer ${
                  parseInt(errPrice) < 0
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("price", { required: true })}
              />
              <label
                for="floating_price"
                className="peer-focus:font-medium pl-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
              {errors.price && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="relative w-full mb-6 group">
              <label
                for="purpose"
                className="peer-focus:font-medium absolute text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Purpose
              </label>
              <select
                id="purpose"
                className="block py-2.5 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                {...register("purpose")}
                onChange={(e) => setProductPurpose(e.target.value)}
              >
                <option selected value="toSale">
                  To Sale
                </option>
                <option value="toRent">To Rent</option>
              </select>
            </div>
          </div>
          <div className="grid gap-5 mb-6 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <label
                for="areaType"
                className="peer-focus:font-medium  text-sm pl-2  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Color Variant
              </label>
              <select
                multiple
                id="floor"
                className="block shadow-md shadow-primary/10 pl-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                {...register("floor")}
              >
                <option selected value="">
                  Select Color
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Orange">Orange</option>
                <option value="Pink">Pink</option>
                <option value="Purple">Purple</option>
                <option value="Brown">Brown</option>
                <option value="Grey">Grey</option>
                <option value="Maroon">Maroon</option>
                <option value="Cyan">Cyan</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Aqua">Aqua</option>
                <option value="Lime">Lime</option>
                <option value="Indigo">Indigo</option>
                <option value="Golden">Golden</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>
          </div>

          <div className="grid items-center gap-5 mb-6 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <label
                style={{ lineHeight: "10px" }}
                className="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Feauture Image
              </label>
              <input
                style={{ lineHeight: "10px" }}
                className="block w-full text-xs text-gray-900 rounded-sm shadow-md cursor-pointer shadow-primary/10 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar small_input"
                type="file"
                multiple
                {...register("featureImage", { required: true })}
              />
              {errors?.featureImage && (
                <p className="absolute text-xs text-red-500">
                  Feauture Image must be provided
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-5 mb-6 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <label
                style={{ lineHeight: "10px" }}
                className="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Upload file
              </label>
              <input
                style={{ lineHeight: "10px" }}
                className="block w-full text-xs text-gray-900 rounded-sm shadow-md cursor-pointer shadow-primary/10 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar small_input"
                type="file"
                multiple
                {...register("upload", { required: true })}
              />
              {errors?.upload && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
            <div
              style={{ alignSelf: "end" }}
              className="relative w-full mb-6 group"
            >
              <label
                for="status"
                className="peer-focus:font-medium absolute text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Status
              </label>
              <select
                id="status"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary ${
                  productPurpose === "toRent" && "cursor-not-allowed"
                }`}
                {...register("status")}
                disabled={productPurpose === "toRent"}
              >
                <option selected value="complete">
                  Complete
                </option>
                <option value="on going">On Going </option>
              </select>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-4 md:gap-3">
            <div className="relative w-full group">
              <div className="relative w-full mb-6 group">
                <label
                  for="floor"
                  className="peer-focus:font-medium absolute text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Floor
                </label>
                <select
                  id="floor"
                  className="block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                  {...register("floor")}
                >
                  <option value="0">0</option>
                  <option selected value="1">
                    1
                  </option>
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
            </div>

            <div className="relative w-full group">
              <div className="relative w-full mb-6 group">
                <label
                  for="room"
                  className="peer-focus:font-medium absolute text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Room
                </label>
                <select
                  id="room"
                  className="block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                  {...register("room")}
                >
                  <option value="0">0</option>
                  <option selected value="1">
                    1
                  </option>
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
            </div>

            <div className="relative w-full group">
              <div className="relative w-full mb-6 group">
                <label
                  for="bathroom"
                  className="peer-focus:font-medium absolute text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Bathroom
                </label>
                <select
                  id="bathroom"
                  className="block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                  {...register("bathroom")}
                >
                  <option value="0">0</option>
                  <option selected value="1">
                    1
                  </option>
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
            </div>

            <div className="relative w-full group">
              <div className="relative w-full mb-6 group">
                <label
                  for="balcony"
                  className="peer-focus:font-medium absolute text-md  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Balcony
                </label>
                <select
                  id="balcony"
                  className="block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                  {...register("balcony")}
                >
                  <option value="0">0</option>
                  <option selected value="1">
                    1
                  </option>
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
            </div>
          </div>

          <div className="grid mb-6 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <input
                onKeyUp={(e) => setErrSize(e.target.value)}
                min="1"
                type="number"
                name="floating_size"
                id="floating_size"
                className={`block py-2.5 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 peer ${
                  parseInt(errSize) < 0
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("size", { required: true })}
              />
              <label
                for="floating_size"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                product Size (sq' f'')
              </label>
              {errors.size && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start mb-6">
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              product Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block py-2.5 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Write your thoughts here..."
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                onChange={() => setAgree(!agree)}
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="terms"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`mt-2 text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary/60  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary/60 transition  duration-300  ${
              agree && "transform active:translate-y-1"
            }`}
            disabled={!agree || loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProducts;
