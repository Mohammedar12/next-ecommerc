"use client";

import React, { useRef, useState, useEffect, useContext } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import CartContext from "@/context/cart";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Modal, Box } from "@mui/material";

export default function Page({ params }) {
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState();
  const [imgPreview, setImgPreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getProduct = async (id) => {
      const { data } = await axios.get(`http://localhost:3001/product/${id}`);

      return setProduct(data);
    };
    getProduct(params?.id);
  }, []);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const url = `http://localhost:3001/categories/${product?.category}`;
  //     const res = await axios.get(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         token: "sbbs76bgsyegfyrbfyue",
  //       },
  //     });
  //     setCategories(res.data);
  //     console.log(res.data);
  //   };
  //   fetchCategories();
  // }, [product]);

  const addItemToCart = () => {
    addToCart({
      id: product?._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      stock: product.stock,
      seller: product.seller,
      quantity: product.quantity,
    });
  };

  const mainRef = useRef(null);

  const handleThumbs = (id) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };

  // console.log(product?._id);
  return (
    <div>
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  // ref={imgRef}
                  className="object-cover inline-block"
                  src={product?.images[0]?.url}
                  alt="Product title"
                  width="340"
                  height="340"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {product?.images?.map((img, index) => (
                  <a
                    key={img?.url}
                    className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                    onClick={() => {
                      setCurrentSlide(index);
                      setImgPreview(true);
                    }}
                  >
                    <img
                      className="w-14 h-14"
                      src={img?.url}
                      alt="Product title"
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <StarRatings
                    rating={product?.ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{product?.ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4 font-semibold text-xl">${product?.price}</p>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  onClick={addItemToCart}
                  className="px-4 py-2 inline-block text-white bg-slate-900 border border-transparent rounded-md hover:bg-slate-700"
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {product?.stock >= 1 ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  {/* <span className="text-gray-500">{categories?.name}</span> */}
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">
                    Seller / Brand:
                  </b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>

          {/* <NewReview /> */}
          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            {/* <Reviews /> */}
          </div>
        </div>
      </section>
      <Modal
        open={imgPreview}
        onClose={() => setImgPreview(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            outline: "none",
          }}
        >
          <Splide
            ref={mainRef}
            options={{
              arrows: true,
              type: "loop",
              perPage: 1,
              perMove: 1,
              focus: "center",
              autoplay: "play",
              speed: 1000,
              breakpoints: {
                640: {
                  width: "80%",
                  perPage: 2,
                },
              },
              gap: 20,
              pagination: false,
            }}
            onMove={(splide, index, prev) => console.log(index)}
            aria-label="My Favorite Images"
          >
            {product?.images?.map((item, index) => (
              <SplideSlide key={item._id}>
                <img src={item.url} />
              </SplideSlide>
            ))}
          </Splide>
          <div className="flex">
            {product?.images?.map((item, index) => (
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap  ">
                <a
                  key={item?.url}
                  className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                  onClick={() => {
                    handleThumbs(currentSlide);
                  }}
                >
                  <img
                    className="w-14 h-14"
                    src={item?.url}
                    alt="Product title"
                    width="500"
                    height="500"
                  />
                </a>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
