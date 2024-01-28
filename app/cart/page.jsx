"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CartContext from "@/context/cart";
import AuthContext from "@/context/auth";
import AddAddress from "@/components/address/AddAddress";

import Image from "next/image";
import Tshirt from "../../assets/T-shirt.jpg";

import {
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Modal,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";

const steps = ["Cart", "Shipping", "Checkout"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  outline: "none",
};
const Page = () => {
  const router = useRouter();

  // stepper
  const [activeStep, setActiveStep] = useState(0);

  // get address id
  const [shippingInfo, setShippingInfo] = useState(0);

  const [newAddress, setNewAddress] = useState(false);

  // get cart data
  const {
    handelCartTotal,
    cartTotal,
    setCartTotal,
    setCart,
    addToCart,
    cart,
    removeFromCart,
    saveOnCheckout,
  } = useContext(CartContext);

  // get address data
  const { address } = useContext(AuthContext);
  const params = useSearchParams();
  useEffect(() => {
    handelCartTotal();
  }, []);

  useEffect(() => {
    const query = params.get("step");
    if (query == "shipping") {
      setActiveStep(1);
    } else if (query == "cart") {
      setActiveStep(0);
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem.stock)) return;

    addToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    addToCart(item);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2);

  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);
  const getShippingId = (id) => {
    setShippingInfo(id);
    cartInfoHandler();
  };

  const cartInfoHandler = () => {
    const data = {
      amount: amountWithoutTax,
      tax: taxAmount,
      totalAmount,
    };

    saveOnCheckout(data);
  };
  const checkoutHandler = async () => {
    if (!shippingInfo) {
      return console.log("enter address");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3001/order/checkout",
        {
          items: cart?.cartItems,
          shippingInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      setCart("");
      localStorage.removeItem("cart");
      setCartTotal("");
      router.push(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-start h-full">
      {/* Stepper */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "10px",
          margin: "50px auto",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {/* Cart */}
      {
        activeStep === 0 ? (
          <div className="container !my-20 flex gap-5 justify-center items-start flex-col lg:flex-row ">
            <div className=" w-full xl:max-w-[800px] border-0 shadow-md p-4 border-[#e7e7e7] rounded-md">
              <div className="bg-black text-white  flex justify-between mb-5 shadow-md rounded-lg p-3">
                <div className="flex gap-2 items-center">
                  <h1 className="text-xl font-bold">Cart</h1>{" "}
                  <span>( 2 Products )</span>
                </div>
                <button className="bg-transparent outline-none">
                  Clear Cart
                </button>
              </div>
              {cart?.cartItems?.map((item) => (
                <div
                  className="flex py-4 px-4 gap-5 w-[95%] m-auto justify-between items-center shadow-md  border-cyan-900 border-0 last:border-0 rounded-md"
                  key={item.id}
                >
                  <div className="item_img">
                    <Image
                      className="rounded-lg"
                      // src={item?.image}
                      src={Tshirt}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      width={100}
                      height={100}
                      alt="a"
                    />
                  </div>
                  <div className="item_name">{item.name}</div>
                  <div className="w-24">
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 border-[1px] border-cyan-900 ">
                      <button
                        // data-action="decrement"
                        className=" bg-transparent text-gray-600 hover:text-gray-700  h-full w-20 rounded-l cursor-pointer outline-none"
                        onClick={() => decreaseQty(item)}
                      >
                        <span className="m-auto text-2xl font-thin">−</span>
                      </button>
                      <input
                        type="number"
                        className="outline-none focus:outline-none text-center w-full bg-transparent font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                        name="custom-input-number"
                        value={item.quantity}
                        readOnly
                      ></input>
                      <button
                        // data-action="increment"
                        className="bg-transparent text-gray-600 hover:text-gray-700  h-full w-20 rounded-r cursor-pointer"
                        onClick={() => increaseQty(item)}
                      >
                        <span className="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>
                  <div className="item_price w-fit">$ {item.price}</div>
                  <button
                    className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="  bg-[#f8f8f8] p-4 w-full lg:max-w-[300px] rounded-md">
              <div className="total ">
                <ul className="mb-5">
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Amount before Tax:</span>
                    <span>
                      ${!amountWithoutTax ? "00.00" : amountWithoutTax}
                    </span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Total Units:</span>
                    <span className="text-green-500">
                      {cart?.cartItems?.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>TAX:</span>
                    <span>${!isNaN(taxAmount) ? taxAmount : "00.00"}</span>
                  </li>
                  <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                    <span>Total price:</span>
                    <span>${!isNaN(totalAmount) ? totalAmount : "00.00"}</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleNext}
                className="bg-black py-3 my-3 text-white rounded-md w-full"
              >
                Continue
              </button>
            </div>
          </div>
        ) : activeStep === 1 ? (
          <div className="">
            <Box
              sx={{
                width: "50%",
                margin: "auto",
                background: "#f8f8f8",
                borderRadius: "7px",
              }}
            >
              <div
                className="border border-gray-200 bg-white shadow-sm 
              rounded p-4 lg:p-6 mb-5"
              >
                <h2 className="text-xl font-semibold mb-5">
                  Shipping information
                </h2>

                <div className="grid sm:grid-cols-1 gap-4 mb-6">
                  {address?.map((item) => (
                    <label
                      className="flex p-3 border border-gray-200 rounded-md
                   bg-gray-50 hover:border-gray-50
                    hover:bg-blue-50 cursor-pointer"
                      key={item._id}
                      onClick={() => getShippingId(item._id)}
                    >
                      <span>
                        <input
                          name="shipping"
                          type="radio"
                          className="h-4 w-4 mt-1"
                        />
                      </span>
                      <p className="ml-2">
                        <span>{item?.street}</span>
                        <small className="block text-sm text-gray-400">
                          {item.city}
                          <br />
                          {item.country}
                          <br />
                          {item.phone_number}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>

                <div>
                  <button
                    onClick={() => setNewAddress(true)}
                    className="bg-black py-3 my-3 text-white rounded-md w-full"
                  >
                    Add new address
                  </button>

                  <div className="flex  gap-2">
                    <button
                      onClick={handleBack}
                      className=" py-3 my-3 bg-black text-white rounded-md w-1/3 "
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className=" py-3 my-3 bg-black text-white rounded-md w-full"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                <Modal
                  open={newAddress}
                  onClose={() => setNewAddress(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <AddAddress />
                  </Box>
                </Modal>
              </div>
            </Box>
          </div>
        ) : activeStep === 2 ? (
          <>
            <div className="container !my-20 flex gap-5 justify-center items-start flex-col lg:flex-row ">
              <div className=" w-full xl:max-w-[800px] border-0 shadow-md p-4 border-[#e7e7e7] rounded-md">
                <div className="bg-black text-white  flex justify-between mb-5 shadow-md rounded-lg p-3">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-lg font-bold">Your Order</h1>{" "}
                    <span>( 2 Products )</span>
                  </div>
                </div>
                {cart?.cartItems?.map((item) => (
                  <div
                    className="flex py-4 px-4 gap-5 w-[95%] m-auto justify-between items-center shadow-md  border-cyan-900 border-0 last:border-0 rounded-md"
                    key={item.id}
                  >
                    <div className="item_img">
                      <Image
                        className="rounded-lg"
                        // src={item?.image}
                        src={Tshirt}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        width={100}
                        height={100}
                        alt="a"
                      />
                    </div>
                    <div className="item_name">{item.name}</div>
                    <div className="w-24">
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 border-[1px] border-cyan-900 ">
                        <button
                          // data-action="decrement"
                          className=" bg-transparent text-gray-600 hover:text-gray-700  h-full w-20 rounded-l cursor-pointer outline-none"
                          onClick={() => decreaseQty(item)}
                        >
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          className="outline-none focus:outline-none text-center w-full bg-transparent font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                          name="custom-input-number"
                          value={item.quantity}
                          readOnly
                        ></input>
                        <button
                          // data-action="increment"
                          className="bg-transparent text-gray-600 hover:text-gray-700  h-full w-20 rounded-r cursor-pointer"
                          onClick={() => increaseQty(item)}
                        >
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="item_price w-fit">$ {item.price}</div>
                  </div>
                ))}
              </div>
              <div className="  bg-[#f8f8f8] p-4 w-full lg:max-w-[300px] rounded-md">
                <div className="total ">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Amount before Tax:</span>
                      <span>
                        ${!amountWithoutTax ? "00.00" : amountWithoutTax}
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>TAX:</span>
                      <span>${!isNaN(taxAmount) ? taxAmount : "00.00"}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>
                        ${!isNaN(totalAmount) ? totalAmount : "00.00"}
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={checkoutHandler}
                  className="bg-black py-3 my-3 text-white rounded-md w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : null // Add code for the next step
      }
    </div>
  );
};

export default Page;
