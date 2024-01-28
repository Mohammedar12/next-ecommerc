"use client";

import Link from "next/link";

import { useEffect, useState, Suspense } from "react";
import thankyouStyle from "../../styles/thank_you.module.css";
import { useRouter, useSearchParams } from "next/navigation";
export default function PaymentStatus(props) {
  const [status, setStatus] = useState("succss");
  const [message, setMessage] = useState();
  const [orderId, setOrderId] = useState();
  const params = useSearchParams();
  // useEffect(()=>{
  //     if(paymentStatus.IsSuccess){
  //         setOrderId(paymentStatus.orderId);
  //         setStatus('Succss');
  //         setMessage('Thank you for the purchase. We received your order.');
  //     }
  //     else{
  //         setStatus(paymentStatus.transactionStatus);
  //         if(paymentStatus.transactionStatus === 'Failed'){
  //             setMessage("Transaction failed due to "+paymentStatus.message);
  //         }
  //         else{
  //             setMessage(paymentStatus.message);
  //         }
  //     }
  // },[paymentStatus]);
  useEffect(() => {
    const query = params.get("status");
    if (query == "succss") {
      setStatus("succss");
    } else if (query == "failed") {
      setStatus("failed");
    }
  }, []);
  if (status === "succss") {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col min-h-screen w-full items-center justify-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <i className="fa-regular fa-face-smile-beam fa-3x"></i>
              <h1 className="fw-light">Thank You</h1>
              <p>
                Thanks For Choosing Us , Enjoy Your Products ! <br /> We Hope To
                See You Soon Here ;
              </p>
            </div>
            <div className="g">
              Your Order Number Is{" "}
              <span className="fw -bold">#{"order   Id"}</span>
            </div>
            <div className="text-center">
              <span className="font-bold">notes :</span> We Will Send A Message
              To You If Your Order Has Been Shipped
            </div>
            <div className="mt-3">
              <Link
                className="bg-gray-900 py-3 px-5 rounded-md m-1 text-white"
                href="/orders"
              >
                MY ORDERS
              </Link>
              <Link
                className="bg-gray-900 py-3 px-5 rounded-md m-1 text-white"
                href="/"
              >
                HOME
              </Link>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container" style={{ height: "70vh" }}>
        <div
          className="row d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "70vh",
            ...(status === "Failed" || status === "Error"
              ? { color: "red" }
              : {}),
          }}
        >
          {status === "Error" && (
            <img
              style={{ width: 200, padding: 10 }}
              src="/images/error.png"
              alt="Error"
            />
          )}
          {status === "failed" && (
            <img
              style={{ width: 200, padding: 10 }}
              src="/images/credit-card.png"
              alt="Payment failed"
            />
          )}
          {status === "succss" && (
            <img
              style={{ width: 200, padding: 10 }}
              src="/images/successful.png"
              alt="Order placed successfully."
            />
          )}
          {message}
          {status === "succss" && (
            <div className="d-flex justify-content-center pt-4">
              <button className="btn btn-outline-success">My Orders</button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
