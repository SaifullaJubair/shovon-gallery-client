import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-dropdown-select";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
function UpdateProduct() {
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errPrice, setErrPrice] = useState(0);
  const [value, setValue] = useState();
  const [categories, setCategories] = useState(null);
  const singleProduct = useLoaderData();
  const {
    _id,
    product_uid,
    product_name,
    category,
    product_heading,
    box_content,
    primary_color,
    product_status,
    primary_img,
    price,
    available_color,
    user_email,
    user_image,
    user_name,
    product_highlight,
    details,
    feature_img1,
    feature_img2,
    wishlist,
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

  useEffect(() => {
    fetch("http://localhost:5000/allcategories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (selectedDate) => {
    setDate(new Date(selectedDate).toISOString());
  };
  const option = [
    { id: "#FF0000", name: "Red" },
    { id: "#0000FF", name: "Blue" },
    { id: "#FFFF00", name: "Yellow" },
    { id: "#008000", name: "Green" },
    { id: "#ffffff", name: "White" },
    { id: "#000000", name: "Black" },
    { id: "#ffa500", name: "Orange" },
    { id: "#ffc0cb", name: "Pink" },
    { id: "#800080", name: "Purple" },
    { id: "#a52a2a", name: "Brown" },
    { id: "#808080", name: "Grey" },
    { id: "#800000", name: "Maroon" },
    { id: "#00ffff", name: "Cyan" },
    { id: "#d2691e", name: "Chocolate" },
    { id: "#00ffff", name: "Aqua" },
    { id: "#00ff00", name: "Lime" },
    { id: "#4b0082", name: "Indigo" },
    { id: "#ffd700", name: "Golden" },
    { id: "#c0c0c0", name: "Silver" },
    { id: "#CD7F32", name: "Bronze" },
  ];
  const handleAddProduct = async (data) => {
    const {
      productName,
      category,
      productHeading,
      boxContent,
      price,
      primaryColor,
      primaryImg,
      productStatus,
      description,
      productHighlight,
      optionalImg1,
      optionalImg2,
    } = data;

    try {
      setLoading(true);

      const updateFields = {
        product_name: productName,
        category,
        product_heading: productHeading,
        box_content: boxContent,
        price,
        primary_color: primaryColor,
        primary_img: primaryImg,
        available_color: value,
        product_status: productStatus,
        user_email: user?.email,
        user_image: user?.photoURL,
        user_name: user?.displayName,
        product_highlight: productHighlight,
        details: description,
        feature_img1: optionalImg1,
        feature_img2: optionalImg2,
        post_date: formattedDate,
      };
      console.log(updateFields);
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${localStorage.getItem(fareBD-token)}`,
        },
        body: JSON.stringify(updateFields),
      };

      const res = await fetch(
        `http://localhost:5000/update/product/${singleProduct?._id}`,
        config
      );
      const data = await res.json();

      if (data.acknowledged) {
        setLoading(false);
        navigate("/dashboard/all-product");

        toast.success(
          `Hey ${user?.displayName}! your product Updated successfully`,
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
    <div className="w-full">
      <div className="  max-w-[768px] w-[95%] mx-auto">
        <h2 className="title uppercase p-8 text-center mb-8 bg-secondary text-white text-2xl font-semibold">
          Add Your Product
        </h2>

        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="p-4 rounded-sm shadow-md shadow-primary/10"
        >
          {/* Product Name and Category  */}
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Product name is here  */}
            <div className="relative w-full mb-8 group">
              <label
                for="floating_name"
                className=" peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                defaultValue={product_name}
                className={`block shadow-md shadow-primary/10 py-2.5 pl-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.productName
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                {...register("productName")}
              />

              {errors.productName && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* product category  */}
            <div className="relative w-full mb-8 group">
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
                <option disabled selected>
                  {category}
                </option>
                {categories?.map((category) => (
                  <option defaultValue={category?.name} key={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Product  heading  */}
          <div className="relative w-full mb-8 group">
            <label
              for="floating_heading"
              className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Heading
            </label>
            <input
              type="text"
              name="floating_heading"
              id="floating_heading"
              defaultValue={product_heading}
              className={`block shadow-md shadow-primary/10 py-2.5  px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-secondary focus:outline-none focus:ring-0  peer `}
              placeholder=" "
              {...register("productHeading")}
            />

            {errors.productHeading && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Box content & Price  */}
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Box Content here  */}
            <div className="relative w-full  group">
              <label
                for="floating_boxContent"
                className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Box Content: What you provide in the box
              </label>
              <input
                type="text"
                name="floating_boxContent"
                id="floating_boxContent"
                defaultValue={box_content}
                className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.boxContent
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("boxContent", { required: true })}
              />

              {errors.boxContent && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Product price here  */}
            <div className="relative w-full mb-6 group">
              <label
                for="floating_price"
                className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
              <input
                onKeyUp={(e) => setErrPrice(e.target.value)}
                type="number"
                min="1"
                name="floating_price"
                id="floating_price"
                defaultValue={price}
                className={`block py-2.5 shadow-md shadow-primary/10 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 peer ${
                  parseInt(errPrice) < 0
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Color Variant and Primary product img  */}
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Select Color  */}
            <div className="relative mt-4 w-full group">
              <label
                for="primaryColor"
                className="  text-xs pl-2  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Color
              </label>
              <select
                id="0"
                className="block shadow-md shadow-primary/10 pl-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer focus:border-secondary"
                {...register("primaryColor", { required: true })}
              >
                <option disabled selected>
                  {primary_color}
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
            <div className="relative w-full mb-6 group ">
              <label
                for="availableColor"
                className="pl-2  text-gray-500  transform  font-semibold"
              >
                <span className="  text-sm  ">Select Available Color:</span>{" "}
                <br />
                <span className="  text-xs  "> Color Selected: </span>
                {available_color?.map((color) => (
                  <div
                    key={color?.id}
                    className=" text-xs pl-1 text-gray-500  transform  font-semibold  inline-flex items-center "
                    // style={{ backgroundColor: color?.id }}
                  >
                    {" "}
                    {color?.name},
                  </div>
                ))}
              </label>
              <Select
                name="select"
                options={option}
                labelField="name"
                valueField="id"
                defaultValue={available_color?.map((color) => (
                  <div
                    key={color?.id}
                    className="mr-2"
                    // style={{ backgroundColor: color?.id }}
                  >
                    {" "}
                    {color?.name},
                  </div>
                ))}
                multi
                onChange={(value) => setValue(value)}
              ></Select>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="relative w-full mt-6 mb-6 group">
              <label
                for="product_status"
                className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Status
              </label>
              <select
                id="productStatus"
                className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.productStatus
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                {...register("productStatus", { required: true })}
              >
                <option disabled selected>
                  {product_status}
                </option>
                <option>Available</option>
                <option>Unavailable</option>
              </select>
              {errors.productStatus && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Primary product img here  */}

            <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Upload Product Primary img
              </label>
              <input
                defaultValue={primary_img}
                className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.primaryImg
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                id="user_avatar small_input"
                type="url"
                {...register("primaryImg", { required: true })}
              />
              {errors?.primaryImg && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
          </div>
          {/*Optional img  */}
          <div className="grid gap-2 md:grid-cols-2 md:gap-3">
            <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Product Feature img 01
              </label>
              <input
                defaultValue={feature_img1}
                className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.optionalImg1
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                id="user_avatar small_input"
                type="url"
                {...register("optionalImg1", { required: true })}
              />
              {errors?.optionalImg1 && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
            {/* optional img 02  */}
            <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Product Feature img 02
              </label>
              <input
                defaultValue={feature_img2}
                className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                  errors.optionalImg2
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                id="user_avatar small_input"
                type="url"
                {...register("optionalImg2", { required: true })}
              />
              {errors?.optionalImg2 && (
                <p className="absolute text-xs text-red-500">
                  Image must be provided
                </p>
              )}
            </div>
            {/* optional img 03  */}
            {/* <div className="relative w-full mb-6 group">
              <label
                className="block mb-2 mt-2 pl-2 text-xs font-medium text-gray-600 dark:text-white"
                for="user_avatar"
              >
                Product optional img 03
              </label>
              <input
                style={{ lineHeight: "10px" }}
                className="block w-full text-xs text-gray-900 rounded-sm shadow-md cursor-pointer shadow-primary/10 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar small_input"
                type="file"
                {...register("optionalImg3")}
              />
            </div> */}
            {/*
            <div id="optionalImg">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Optional Img Preview"
                />
              ))}
            </div> */}
          </div>

          <div className="flex flex-col items-start mb-6">
            <label
              for="productHighlight"
              className="block mt-2 text-sm pl-2 font-semibold text-gray-600 dark:text-white"
            >
              Product Highlight
            </label>
            <textarea
              id="productHighlight"
              rows="4"
              defaultValue={product_highlight}
              className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Write your product key feature..."
              {...register("productHighlight", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Product description  */}
          <div className="flex flex-col items-start mb-6">
            <label
              for="message"
              className="block mb-2 pl-2 text-sm font-semibold text-gray-600 dark:text-white"
            >
              Product Description
            </label>
            <textarea
              id="message"
              rows="4"
              defaultValue={details}
              className="block py-2.5 pl-2 shadow-md shadow-primary/10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder="Write your product description here..."
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
export default UpdateProduct;
