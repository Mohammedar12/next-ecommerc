"use client";

import React, { useState, useContext, useEffect } from "react";

import AuthContext from "@/context/auth";
import axios from "axios";

const Products = () => {
  const { error, updateAddress, clearErrors, setIsOk, isOk } =
    useContext(AuthContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState();
  const [size, setSize] = useState("XS");
  const [gender, setGender] = useState();
  const [neckType, setNeckType] = useState();

  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  // fetchCategories

  useEffect(() => {
    const fetchCategories = async () => {
      const url = "http://localhost:3001/categories";
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          token: "sbbs76bgsyegfyrbfyue",
        },
      });
      setCategories(res.data);
      console.log(res.data);
    };
    fetchCategories();
  }, []);

  const onChange = (e) => {
    const files = e.target.files;
    const previews = [];

    // Iterate over each file and create a new FileReader for each one
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          previews.push(reader.result);

          // Check if all files have been read
          if (previews.length === files.length) {
            setImagePreview(previews);
            console.log(files);
          }
        }
      };

      // Read the current file as a data URL
      reader.readAsDataURL(file);
    });

    // Assuming setImage is a state-setting function to store the selected files
    setImage(Array.from(files));
  };

  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    image.forEach((img) => {
      formData.append("image", img);
    });
    formData.append("category", category?._id);
    formData.append("seller", seller);
    formData.append("stock", stock);
    formData.append("size", "XS");
    formData.append("gender", gender);
    formData.append("neckType", neckType);

    newProduct(formData);
  };

  const newProduct = async (formData) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/product/new`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genders = ["Men", "Women"];
  const neckTypes = ["Polo", "Round", "V", "Crew"];
  return (
    <>
      <section className="py-10">
        <main className="m-auto md:w-2/3 lg:w-full px-4">
          <div
            style={{ maxWidth: "480px" }}
            className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
          >
            <form onSubmit={submitProduct}>
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
              <div className="grid md:grid-cols-2 gap-x-3">
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> description </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="Type Product Description "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> price </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="number"
                    placeholder="Type Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-2">
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> image</label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="file"
                    multiple
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> Category</label>
                  <select
                    className="h-[48px] border border-gray-200 bg-gray-100 rounded-md  hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    value={category?._id}
                    onChange={(e) =>
                      setCategory({
                        _id: e.target.value,
                        name: e.target.options[e.target.selectedIndex].text,
                      })
                    }
                  >
                    {/* Render the options dynamically based on fetched data */}
                    {categories?.map((item) => (
                      <option key={item.id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-2">
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> Size</label>
                  <select
                    className="h-[48px] border border-gray-200 bg-gray-100 rounded-md  hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {/* Render the options dynamically based on fetched data */}
                    {sizes?.map((item, i) => (
                      <option className="h-[40px]" key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> Gender</label>
                  <select
                    className="h-[48px] border border-gray-200 bg-gray-100 rounded-md  hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {/* Render the options dynamically based on fetched data */}
                    {genders?.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-2">
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> Size</label>
                  <select
                    className="h-[48px] border border-gray-200 bg-gray-100 rounded-md  hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    value={neckType}
                    onChange={(e) => setNeckType(e.target.value)}
                  >
                    {/* Render the options dynamically based on fetched data */}
                    {neckTypes?.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block mb-1"> seller </label>
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="TType Product Seller"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block mb-1"> stock </label>
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="number"
                  placeholder="Type Product Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              {imagePreview?.map((img) => (
                <div className="grid md:grid-cols-2">
                  <img className="w-[100px]" src={img} alt="" />
                </div>
              ))}
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
