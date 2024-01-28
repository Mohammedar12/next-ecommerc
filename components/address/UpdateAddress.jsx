"use client";

import React, { useState, useContext } from "react";

import Sidebar from "../Sidbar/Sidbar";
import { countries } from "countries-list";
import AuthContext from "@/context/auth";

const UpdateAddress = ({ addressId, close }) => {
  const { error, updateAddress, clearErrors  , setIsOk , isOk} = useContext(AuthContext);

  const countriesList = Object.values(countries);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [ZIPcode, setZIPcode] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newAddress = {
      street,
      city,
      state,
      ZIPcode,
      phone_number,
      country,
    };
    console.log(addressId);
    updateAddress(addressId, newAddress);
  };

  return (
    <>
      <section className="py-10">
        {/* <Sidebar /> */}
        <main className="m-auto md:w-2/3 lg:w-full px-4">
          <div
            style={{ maxWidth: "480px" }}
            className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
          >
            <form onSubmit={submitHandler}>
              <h2 className="mb-5 text-2xl font-semibold">
                Update new Address
              </h2>

              <div className="mb-4 md:col-span-2">
                <label className="block mb-1"> Street* </label>
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="Type your address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-x-3">
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> City </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="Type your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> State </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="Type state here"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-2">
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> ZIP code </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="number"
                    placeholder="Type zip code here"
                    value={ZIPcode}
                    onChange={(e) => setZIPcode(e.target.value)}
                  />
                </div>

                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> Phone No </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="number"
                    placeholder="Type phone no here"
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4 md:col-span-2">
                <label className="block mb-1"> Country </label>
                <select
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countriesList.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                onClick={() => {
                 if(error) {
                  close(false)
                 }
                }}
                className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </form>
          </div>
        </main>
      </section>
    </>
  );
};

export default UpdateAddress;
