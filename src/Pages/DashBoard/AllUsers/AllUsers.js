import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Select, Table, TextInput } from "flowbite-react";
import { FaEdit, FaMailBulk, FaTrash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("https://shovon-gallery-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUsers(data);
      });
  }, [refetch]);

  const handleMakeAdmin = (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    fetch(
      `https://shovon-gallery-server.vercel.app/users/update/${editData._id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          role,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("User Role Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setEditData(null);
          setRefetch(!refetch);
        }
      });
  };

  const handleDeleteUser = (user) => {
    fetch(`https://shovon-gallery-server.vercel.app/users/${user?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          setRefetch(!refetch);
          toast(`User ${user.name} deleted successfully`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setDeleteData(null);
        }
      });
  };
  const showModal = (user) => {
    setDeleteData(user);
    // console.log(user);
  };
  const showEditModal = (user) => {
    setEditData(user);
    // console.log(user);
  };
  const onClose = () => {
    setDeleteData(null);
  };
  const onEditClose = () => {
    setEditData(null);
  };
  return (
    <div className="mx-auto w-full overflow-x-auto">
      <div className=" ">
        <h2 className="title uppercase p-10 text-center mb-10 bg-secondary text-white text-2xl font-semibold">
          All Users{" "}
        </h2>
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Register</Table.HeadCell>
            <Table.HeadCell>Operations</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users?.map((user, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={user.img}
                    className="w-12 h-12 object-cover object-center rounded-full ring-4 ring-secondary/40"
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.createdAt.slice(0, 12)}</Table.Cell>
                <Table.Cell className="flex gap-3">
                  <Button
                    size="xs"
                    color="success"
                    onClick={() => setEditData(user)}
                  >
                    <FaEdit className="mr-2"></FaEdit> Edit
                  </Button>

                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => setDeleteData(user)}
                  >
                    <FaTrash className="mr-2"></FaTrash> Delete
                  </Button>

                  {editData !== null && (
                    <div
                      id="popup-modal"
                      tabIndex="-1"
                      className="fixed flex items-center justify-center top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                    >
                      <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <button
                            onClick={() => setEditData(null)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                          <div className="py-16 px-6 text-center">
                            <form onSubmit={handleMakeAdmin}>
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to update this{" "}
                                <span className="font-bold">
                                  {editData?.name}
                                </span>{" "}
                                ?
                              </h3>
                              {/* name input field  */}
                              <div>
                                <div className="mb-2 block">
                                  {/* <Label
                                                htmlFor="name"
                                                value="Your name"
                                            /> */}
                                </div>
                                <TextInput
                                  id="name"
                                  type="name"
                                  value={editData?.name}
                                  icon={FaUser}
                                  readOnly
                                />
                              </div>
                              {/* email input field  */}
                              <div className="my-4">
                                <div className="mb-2 block">
                                  {/* <Label
                                                htmlFor="email4"
                                                value="Your email"
                                            /> */}
                                </div>
                                <TextInput
                                  id="email4"
                                  type="email"
                                  icon={FaMailBulk}
                                  value={editData?.email}
                                  readOnly
                                />
                              </div>
                              <div id="select" className="my-4">
                                <div className="mb-2 block">
                                  {/* <Label
                                                htmlFor="role"
                                                value="Select your country"
                                            /> */}
                                </div>
                                <Select
                                  id="role"
                                  name="role"
                                  required={true}
                                  defaultValue={editData?.role}
                                >
                                  <option value="admin">Admin</option>
                                  <option value="user">User</option>
                                </Select>
                              </div>
                              {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}

                              <div className="flex justify-center gap-4">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {deleteData !== null && (
                    <div
                      id="popup-modal"
                      tabIndex="-1"
                      className="fixed flex items-center justify-center top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                    >
                      <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <button
                            onClick={() => setDeleteData(null)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                          <div className="p-6 text-center">
                            <svg
                              aria-hidden="true"
                              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this User{" "}
                              {user?.email}
                            </h3>
                            <button
                              onClick={() => handleDeleteUser(deleteData)}
                              data-modal-hide="popup-modal"
                              type="button"
                              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            >
                              Yes, I'm sure
                            </button>
                            <button
                              onClick={onClose}
                              data-modal-hide="popup-modal"
                              type="button"
                              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                              No, cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
