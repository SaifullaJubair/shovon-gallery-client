import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Loader from "../../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";

const UserProfile = () => {
  const [singleUser, setSingleUser] = useState({});
  const [editData, setEditData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
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

  const showEditModal = (singleUser) => {
    setEditData(singleUser);
    console.log(singleUser);
  };
  const onEditClose = () => {
    setEditData(null);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const mobileNumber = form.number.value;
    const address = form.address.value;
    const data = {
      email: singleUser?.email,
      mobileNumber: mobileNumber,
      address: address,
    };
    console.log(data);
    fetch("http://localhost:5000/edituser", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          form.reset("");
          toast("Edit successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          setEditData(null);
          setRefetch(!refetch);
        }
      });
  };

  if (loading || !user) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className="lg:mx-10 md:mx-6 mx-2 my-10">
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

          {/* Address */}

          {singleUser?.address ? (
            <>
              <p className="text-gray-500 mt-6">Address</p>
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

        {/* Update user modal  */}

        {editData !== null && (
          <div>
            <div>
              <Modal show={true} size="md" popup={true} onClose={onEditClose}>
                <Modal.Header />
                <Modal.Body>
                  <form onSubmit={handleEdit}>
                    <h3 className="mb-5 text-lg font-medium text-gray-500 dark:text-gray-400">
                      Update your profile
                    </h3>
                    {/* name input field  */}
                    <div>
                      <div className="mb-2 block">
                        <Label value="Address" />
                      </div>
                      <TextInput name="address" type="text" />
                    </div>
                    <div>
                      <div className="my-2 block">
                        <Label value="Mobile" />
                      </div>
                      <TextInput
                        name="number"
                        type="number"
                        defaultValue={editData?.mobileNumber}
                      />
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
