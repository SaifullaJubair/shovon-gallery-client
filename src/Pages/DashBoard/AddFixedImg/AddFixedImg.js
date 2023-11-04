import { Button, Modal, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AddFixedImg = () => {
  const [fixedImg, setFixedImg] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);

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
    fetch("http://localhost:5000/allFixedImg")
      .then((res) => res.json())
      .then((data) => {
        setFixedImg(data);
      });
  }, [refetch]);

  const showModal = (item) => {
    setDeleteData(item);
    console.log(item);
  };
  const showEditModal = (item) => {
    setEditData(item);
    // console.log(item);
  };
  const onClose = () => {
    setDeleteData(null);
  };
  const onEditClose = () => {
    setEditData(null);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const name = e.target.editFixedImgName.value;
    const fixedImg = e.target.editFixedImgURL.value;
    const status = e.target.editFixedImgStatus.value;

    const data = {
      _id: editData?._id,
      name,
      fixedImg,
      status,
      post_date: formattedDate,
    };
    // console.log(data);
    fetch("http://localhost:5000/update/fixedImg", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Edit successful", {
          position: toast.POSITION.TOP_CENTER,
        });

        setEditData(null);
        setRefetch(!refetch);

        // toast.error("Edit Unsuccessful", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const name = e.target.newFixedImgName.value;
    const fixedImg = e.target.newFixedImgURL.value;
    const status = e.target.fixedImgStatus.value;
    const data = {
      name,
      fixedImg,
      status,
      post_date: formattedDate,
    };
    fetch("http://localhost:5000/addFixedImg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset("");
        toast("added successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRefetch(!refetch);
      });
  };

  const handleDelete = (data) => {
    fetch("http://localhost:5000/deleteFixedImg", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Delete successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setDeleteData(null);
        setRefetch(!refetch);
      });
  };
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto max-w-[1440px]">
      {/* <DashboardSideBar></DashboardSideBar> */}

      <div className="flex-grow">
        <h2 className="title uppercase p-4 text-center  mb-10 bg-orange-500 text-white text-2xl font-semibold">
          Add Banner Image
        </h2>

        <form
          onSubmit={handleAdd}
          className="flex flex-col  justify-center items-center mx-auto  gap-2"
        >
          <TextInput
            id="base"
            type="text"
            className="text-gray-600 w-[270px] font-normal"
            placeholder="Fixed Image name"
            sizing="lg"
            name="newFixedImgName"
            required={true}
          />
          <TextInput
            id="base"
            type="url"
            className="text-gray-600 w-[270px] font-normal"
            placeholder="Fixed Image URL"
            sizing="lg"
            name="newFixedImgURL"
            required={true}
          />
          <div className="w-64 my-2">
            <label className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 py-2 my-2">
              Fixed Image Status
            </label>
            <select
              id="fixedImgStatus"
              name="fixedImgStatus"
              required={true}
              className="block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer "
            >
              <option disabled value="Active" className="text-gray-700">
                Fixed Image Status
              </option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <button
            className=" mt-2 text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary/60  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary/60 transition  duration-300"
            type="submit"
          >
            Add Fixed Img
          </button>
        </form>

        <h2 className="title uppercase p-4 text-center mt-24 mb-10 bg-orange-500 text-white text-2xl font-semibold">
          All Fixed Images
        </h2>

        <small className="text-gray-700 font-medium ">
          #Note: Minimum upload or active 2 fixed images to show in home page.
        </small>

        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>

            <Table.HeadCell>Fixed Img</Table.HeadCell>
            <Table.HeadCell>Fixed Image Name</Table.HeadCell>
            <Table.HeadCell>Post Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Operations</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {fixedImg?.map((item, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item?._id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  <img src={item.fixedImg} className="w-16 h-12 " alt="" />
                </Table.Cell>
                <Table.Cell className="font-bold">{item?.name}</Table.Cell>
                <Table.Cell>{item.post_date.slice(0, 11)}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell className="flex gap-3">
                  <Button
                    color="success"
                    size="xs"
                    onClick={() => showEditModal(item)}
                  >
                    <FaEdit className="mr-2"></FaEdit> Edit
                  </Button>

                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => showModal(item)}
                  >
                    <FaTrash className="mr-2"></FaTrash> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {deleteData !== null && (
          <div>
            <div>
              <Modal show={true} size="md" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this{" "}
                      <span className="font-bold">{deleteData?.name}</span> ?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        onClick={() => handleDelete(deleteData)}
                      >
                        Yes, I'm sure
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          setDeleteData(null);
                        }}
                      >
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}

        {/* Update user modal  */}

        {editData !== null && (
          <div>
            <div>
              <Modal show={true} size="md" popup={true} onClose={onEditClose}>
                <Modal.Header />
                <Modal.Body>
                  <form onSubmit={handleEdit}>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to update this{" "}
                      <span className="font-bold">{editData?.name}</span> ?
                    </h3>
                    {/* name input field  */}
                    <div className="mb-2">
                      <TextInput
                        name="editFixedImgName"
                        type="text"
                        defaultValue={editData?.name}
                        required={true}
                      />
                    </div>

                    <div>
                      <TextInput
                        id="base"
                        type="url"
                        className="text-gray-600 mb-2 font-normal"
                        placeholder="Fixed Image URL"
                        name="editFixedImgURL"
                        defaultValue={editData.fixedImg}
                      />
                    </div>
                    <div className="">
                      <label className="peer-focus:font-medium absolute text-md pl-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] font-semibold peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 py-2 my-2">
                        Fixed Image Status
                      </label>
                      <select
                        id="editFixedImgStatus"
                        name="editFixedImgStatus"
                        required={true}
                        className="block shadow-md shadow-primary/10 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0  peer "
                      >
                        <option disabled value={editData.status}>
                          Fixed Image Status
                        </option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
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

export default AddFixedImg;
