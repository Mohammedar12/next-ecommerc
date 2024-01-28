"use client";

import React, { useState, useContext } from "react";

import AuthContext from "@/context/auth";
import axios from "axios";

const Products = () => {
  const { error, updateAddress, clearErrors, setIsOk, isOk } =
    useContext(AuthContext);

  const [name, setName] = useState("");

  const submitCategory = (e) => {
    e.preventDefault();

    newCategory({ name });
  };

  const newCategory = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/categories/new`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="py-10">
        <main className="m-auto md:w-2/3 lg:w-full px-4">
          <div
            style={{ maxWidth: "480px" }}
            className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
          >
            <form onSubmit={submitCategory}>
              <h2 className="mb-5 text-2xl font-semibold">Add Product</h2>
              <div className="mb-4 md:col-span-2">
                <label className="block mb-1"> name* </label>
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="Type Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* <img className="w-[100px]" src={imagePreview[0]} alt="" />; */}
              <button
                type="submit"
                onClick={() => {
                  if (error) {
                    close(false);
                  }
                }}
                className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </form>
          </div>
        </main>
      </section>
    </>
  );
};

export default Products;
