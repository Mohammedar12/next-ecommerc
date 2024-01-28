"use client";

import React, { useContext, useState, useEffect } from "react";

import Link from "next/link";
import AuthContext from "@/context/auth";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { Modal, Box, Button } from "@mui/material";
import AddAddress from "@/components/address/AddAddress";
import UpdateAddress from "@/components/address/UpdateAddress";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  outline: "none",
};

const Profile = () => {
  const [addressId, setAddressId] = useState();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = (id) => {
    setAddressId(id);
    setUpdate(true);
  };
  const handleNoUpdate = () => setUpdate(false);
  const { userData, address, deletAddress } = useContext(AuthContext);

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={
              userData?.avatar ? userData?.avatar?.url : "/images/default.png"
            }
            alt={userData?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{userData?.name}</h5>
          <p>
            <b>Email:</b> {userData?.email} | <b>Joined On: </b>
            {userData?.createdAt?.slice(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <div>{/* {console.log(address[0] , "s")} */}</div>
      <div>
        {address?.map((data, i) => (
          <div className="mb-5 gap-4" key={data._id}>
            <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer relative">
              <div className="mr-3">
                <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
                  <FaMapMarkerAlt />
                </span>
              </div>
              <figcaption
                className="text-gray-600"
                onClick={() => handleUpdate(data._id)}
              >
                <p className="text-blue-800">
                  {data.street} <br /> {data.city}, {data.state}, {data.ZIPcode}
                  , {data.country}
                  <br />
                  Phone no: {data.phone_number}
                </p>
              </figcaption>
              <div className=" absolute right-3">
                <span
                  className="flex items-center justify-center text-2xl w-12 h-12  rounded-full  mt-2"
                  onClick={() => deletAddress(data._id)}
                >
                  <TiDeleteOutline />
                </span>
              </div>
            </figure>
          </div>
        ))}
      </div>

      <button
        onClick={handleOpen}
        className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        <i className="mr-1 fa fa-plus"></i> Add new address
      </button>

      <hr className="my-4" />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddAddress />
        </Box>
      </Modal>
      <Modal
        open={update}
        onClose={handleNoUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateAddress addressId={addressId} close={setUpdate} />
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
