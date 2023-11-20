import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Loader from "../../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const [singleUser, setSingleUser] = useState({});
  const [editData, setEditData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (user && user.email) {
      // Fetch user data only if user is available and has an email
      fetch(`https://shovon-gallery-server.vercel.app/singleuser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleUser(data);
          setRefetch(!refetch);
        })
        .catch((error) => {
          // Handle fetch error if necessary
          console.error(error);
        });
    } else {
      // Handle case when user is not authenticated
      setSingleUser(null); // Set singleUser to null or an empty object
      setRefetch(!refetch);
    }
  }, [user, refetch]);

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

  const showEditModal = (singleUser) => {
    setEditData(singleUser);
    console.log(singleUser);
  };

  const onClose = () => {
    setEditData(null);
  };

  const handleEdit = (data) => {
    if (!selectedDivision || !selectedDistrict) {
      toast.error("Please select both division and district.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const updateUserData = {
      name: data.name,
      email: user.email,
      division: data.division,
      district: data.district,
      address: data.address,
      mobileNumber: data.number,
      postDate: formattedDate,
    };

    // console.log(data);
    fetch("https://shovon-gallery-server.vercel.app/edituser", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUserData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast("Edit successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          setEditData(null);
          setRefetch(!refetch);
        }
      });
  };
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

  const validateBangladeshiMobileNumber = (value) => {
    // Regular expression for Bangladeshi mobile numbers
    const mobileNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    return mobileNumberRegex.test(value);
  };

  if (loading || !user) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className="flex flex-col items-center py-16 bg-gray-50">
        <p className="text-gray-700 font-semibold  text-2xl mb-6">My Profile</p>
        <div>
          {/* User Img */}

          {singleUser?.img ? (
            <>
              <img
                src={singleUser?.img}
                alt="User Img"
                className="w-72 h-72 my-6"
              />
            </>
          ) : (
            <>
              <p className="text-gray-500 mt-6"> Please upload your img.</p>
            </>
          )}

          {/* Name */}

          <p className="text-gray-500 mt-6">Full Name</p>
          <p className="text-gray-700 font-medium text-lg">
            {singleUser?.name}
          </p>

          {/* Email */}

          <p className="text-gray-500 mt-6">Email</p>
          <p className="text-gray-700 font-medium text-lg">
            {singleUser?.email}
          </p>

          {/* Mobile number  */}

          {singleUser?.mobileNumber ? (
            <>
              <p className="text-gray-500 mt-6">Mobile Number</p>
              <p className="text-gray-700 font-medium text-lg">
                {singleUser?.mobileNumber}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 mt-6">Mobile Number</p>
              <p className="text-gray-600 font-medium text-lg">
                Please enter your mobile number
              </p>
            </>
          )}

          {singleUser?.division ? (
            <>
              <p className="text-gray-500 mt-3">Division</p>
              <p className="text-gray-700 font-medium text-lg">
                {singleUser?.division}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 mt-3">Division</p>
              <p className="text-gray-600 font-medium text-lg">
                Please enter your division
              </p>
            </>
          )}
          {singleUser?.district ? (
            <>
              <p className="text-gray-500 mt-3">District</p>
              <p className="text-gray-700 font-medium text-lg">
                {singleUser?.district}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 mt-3">District</p>
              <p className="text-gray-600 font-medium text-lg">
                Please enter your District
              </p>
            </>
          )}

          {/* Address */}

          {singleUser?.address ? (
            <>
              <p className="text-gray-500 mt-3">Address</p>
              <p className="text-gray-700 font-medium text-lg">
                {singleUser?.address}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 mt-6">Address</p>
              <p className="text-gray-600 font-medium text-lg">
                Please enter your address
              </p>
            </>
          )}
        </div>
        <div className="flex items-center">
          <button
            className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 mr-4  my-6"
            onClick={() => showEditModal(singleUser)}
          >
            Edit Profile
          </button>

          <button
            className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Update user modal  */}

        {editData !== null && (
          <div>
            <div>
              <Modal show={true} size="xl" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                  <form onSubmit={handleSubmit(handleEdit)}>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Update Profile
                    </h3>
                    {/* User name */}
                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        defaultValue={singleUser?.name}
                        className={`block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer ${
                          errors.name
                            ? "focus:border-red-500 border-red-500"
                            : "focus:border-secondary"
                        }`}
                        placeholder=" "
                        {...register("name", { required: true })}
                      />

                      <label
                        for="floating_name"
                        className="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Your Name
                      </label>
                      {errors.name && (
                        <span className="text-xs text-red-500">
                          User name is required
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

                    {/* Your Address */}
                    <div className="relative w-full mb-6 group">
                      <input
                        type="text"
                        name="floating_address"
                        id="floating_address"
                        defaultValue={singleUser?.address || ""}
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
                        Your address
                      </label>

                      {errors.address && (
                        <span className="text-xs text-red-500">
                          Address is required
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
                          required: "Mobile number required",
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

export default UserProfile;
