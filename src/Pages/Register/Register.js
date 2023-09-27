import { GoogleAuthProvider } from "firebase/auth";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
// import { FaBeer, FcGoogle } from "react-icons/fc";
const Register = () => {
  const { logout, updateUserProfile, providerLogin, createUser, user } =
    useContext(AuthContext);
  // console.log(user)
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const [createUserEmail, setCreateUserEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const termsAndCondition = (event) => {
    setTermsAccepted(event.target.checked);
  };
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user);

        const currentUser = {
          displayName: user.displayName,
          email: user.email,
        };
        updateUserProfile(currentUser)
          .then(() => {
            saveUser(user.displayName, user.email, user.photoURL);
          })
          .catch((error) => console.error(error));
        // console.log(currentUser);
        setError("");
      })
      .catch((error) => console.error(error, error.message));
  };

  const saveUser = (displayName, email, photoURL) => {
    let myuuid = uuidv4();
    console.log(myuuid);
    const createdAt = new Date().toISOString();
    const user = {
      name: displayName,
      email,
      role: "user",
      uid: myuuid,
      createdAt,
      img: photoURL,
    };
    console.log(user);
    fetch("http://localhost:5000/users/adduser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setCreateUserEmail(user.email);
        // console.log(user.email)
        toast("Register success", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const [passwordMatch, setPasswoedMatched] = useState();

  const onchangeHande = (event) => {
    event.preventDefault();
    const form = event.target;
    // console.log(event.target.value)
    setPasswoedMatched(event.target.value);
  };
  const onchangeHande1 = (event) => {
    event.preventDefault();
    const form = event.target;
    const second = event.target.value;
    if (second !== passwordMatch) {
      setError(" Password not matched");
    } else {
      setError("");
      return;
    }
  };

  const handleRegister = async (data) => {
    const { name, email, password, password2, photo, userType } = data;

    const image = photo[0];
    if (password !== password2) {
      setError("password Password not matched");
      return;
    }
    setLoading(true);
    setError("");

    // console.log(photo[0]);
    // console.log(name, image, email, password, password2, userType);

    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log(imgData)
        createUser(email, password)
          .then((result) => {
            // console.log(result.user)
            // console.log(result.user)
            const currentUser = {
              displayName: name,
              photoURL: imgData.data.url,
            };
            console.log(name);
            updateUserProfile(currentUser)
              .then((result) => {
                // const users =  { name, email, password, createdAt: new Date().toISOString(), photoURL: data?.data?.display_url };
                // console.log(result)
                fetch("http://localhost:5000/users/adduser", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(insertUser),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    // console.log(data)
                    setCreateUserEmail(email);
                    toast("Registration successful", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    // form.reset()
                    // router.push('/')
                  })
                  .catch((err) => console.log(err));
                const user = result.user;
                // console.log(user)
                setLoading(false);
                setError("");
                if (user.email) {
                  // console.log(user)

                  toast("Registration successful", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  // navigate(from, { replace: true });
                  setLoading(false);
                }
              })
              .catch((err) => console.log(err));

            // code start data store to mongodb
            // console.log(user)
            let myuuid = uuidv4();

            const insertUser = {
              name: name,
              email: email,
              uid: myuuid,
              img: imgData.data.url,
              role: userType,
              createdAt: new Date().toISOString(),
            };
          })
          .catch((e) => {
            // console.log(e);
            setError(e.message);
            setLoading(false);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="md:mx-6">
      <div className="w-full justify-around my-8 lg:flex">
        <div className="w-full text-center text-xl font-bold flex flex-col justify-center items-center">
          {/* <h2 className="text-2xl text-black my-auto">Welcome To Our Page</h2> */}
          <img
            src="https://i.ibb.co/FDFvSHx/119048-login-verification.gif"
            alt=""
          />
        </div>
        <div className=" bg-red-5 md:px-10 px-4 py-4 my-8 lg:w-4/5">
          <h1 className="text-black text-5xl font-bold mb-5 text-center ">
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-4"
          >
            {/* name  */}
            <div className="relative w-full mb-6 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                  errors.name
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("name", { required: true })}
              />

              <label
                for="floating_name"
                className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
              {errors.name && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* email  */}
            <div className="relative w-full mb-6 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                  errors.email
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("email", { required: true })}
              />

              <label
                for="floating_email"
                className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your email
              </label>
              {errors.email && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* photo */}
            <div className="relative w-full mb-6 group">
              <input
                type="file"
                name="floating_image"
                id="floating_image"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                  errors.photo
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("photo", { required: true })}
              />

              <label
                for="floating_image"
                className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Upload Profile Picture
              </label>
              {errors.photo && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Select user type */}
            {/* <div className="relative w-full mb-2 group flex gap-8 pt-2">
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="floating_user_type_buyer"
                  value="buyer"
                  id="floating_user_type_buyer"
                  className={`block shadow-md shadow-primary/10 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                    errors.userType
                      ? "focus:border-red-500 border-red-500"
                      : "focus:border-secondary"
                  }`}
                  placeholder="Buyer "
                  {...register("userType", { required: true })}
                  defaultChecked
                />
                <label for="floating_user_type_buyer">Buyer</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="floating_user_type_seller"
                  value="seller"
                  id="floating_user_type_seller"
                  className={`block shadow-md shadow-primary/10 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                    errors.userType
                      ? "focus:border-red-500 border-red-500"
                      : "focus:border-secondary"
                  }`}
                  placeholder="Seller "
                  {...register("userType", { required: true })}
                />
                <label for="floating_user_type_seller">Seller</label>
              </div>

              <label
                for="floating_image"
                className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Select user type
              </label>
              {errors.userType && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div> */}

            {/* password  */}
            <div className="relative w-full mb-6 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                  errors.password
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    message:
                      "Password must have uppercase, number and special characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <label
                for="floating_password"
                className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your password
              </label>
              {errors.password && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* repeat password  */}
            <div className="relative w-full mb-6 group">
              <input
                type="password"
                name="floating_password2"
                id="floating_password2"
                className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                  errors.password2
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-secondary"
                }`}
                placeholder=" "
                {...register("password2", { required: true })}
              />

              <label
                for="floating_password2"
                className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Re-enter your password
              </label>
              {errors.password2 && (
                <span className="text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Error show  */}
            {error && <p className="text-red-500">{error}</p>}
            {/* check box / mark  */}
            <div className="flex items-center gap-2">
              <Checkbox
                onClick={termsAndCondition}
                id="agree"
                type="checkbox"
              />
              <Label htmlFor="agree">
                I agree with the{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </Link>
              </Label>{" "}
            </div>
            <p className="flex items-center gap-2">
              Already have an account?
              <Link className="text-blue-500 underline" to="/login">
                Login
              </Link>
            </p>

            {loading ? (
              <Loader></Loader>
            ) : (
              <Button
                className=" lg:mx-auto w-full bg-secondary hover:bg-primary"
                disabled={!termsAccepted}
                type="submit"
              >
                Register
              </Button>
            )}

            <div className="flex justify-between  py-4">
              <div className="flex w-full">
                <div className="flex flex-col w-full border-opacity-50">
                  <div className="text-xs text-black text-center z-10 inline-block font-semibold">
                    Or Continue With
                  </div>
                  <hr className="border -mt-2" />
                  <div className="grid w-full card  rounded-box place-items-center pt-8">
                    <div className="flex gap-4 w-full">
                      <Button
                        outline={true}
                        className="hover:text-white text-3xl w-full bg-secondary"
                        onClick={handleGoogleSignIn}
                      >
                        <span className="flex items-center justify-center font-bold hover:text-white focus:text-white w-full">
                          <FcGoogle className="mr-2 text-xl" />
                          Google
                        </span>
                      </Button>
                      <Button
                        outline={true}
                        className="text-3xl w-full bg-primary"
                        // onClick={handleFacebookLogin}
                      >
                        <span className="flex items-center justify-center font-bold hover:text-white focus:text-white w-full">
                          <CiFacebook className="mr-2 text-xl font-bold" />
                          Facebook
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
