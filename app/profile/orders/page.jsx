"use client";
import { useEffect, useState } from "react";

import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const data = axios
      .get(`${process.env.base_url}/order/orders`, {
        headers: {
          "Content-Type": "application/json",
          token: process.env.TOKEN,
        },
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        setOrders(data.data);
      });
  }, []);

  return (
    <>
      <section className="py-10">
        <main className="md:w-2/3 lg:w-3/4 px-4">
          <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
          {orders?.map((order) => (
            <article
              key={order.id}
              className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md"
            >
              <header className="lg:flex justify-between mb-4">
                <div className="mb-4 lg:mb-0">
                  <p className="font-semibold">
                    <span>Order ID: 34345454 </span>• {order.orderStatus}
                  </p>
                  <p className="text-gray-500">{order.createAt} </p>
                </div>
              </header>
              <div className="grid md:grid-cols-3 gap-2">
                <div>
                  <p className="text-gray-400 mb-1">Person</p>
                  <ul className="text-gray-600">
                    <li>{order?.user.name}</li>
                    <li>Phone: {order.user.email}</li>
                    <li>Email: {order.createAt}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Delivery address</p>
                  <ul className="text-gray-600">
                    <li>123 street</li>
                    <li>Orlando, FL, 12345</li>
                    <li>US</li>
                  </ul>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Payment</p>
                  <ul className="text-gray-600">
                    <li className="text-green-400">PAID</li>
                    <li>Tax paid: $12</li>
                    <li>Total paid: $343</li>
                  </ul>
                </div>
              </div>

              <hr className="my-4" />

              {order?.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-2 lg:grid-cols-2 gap-2"
                >
                  <figure className="flex  w-full">
                    <div>
                      <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                        <img
                          src={item.image}
                          height="60"
                          width="60"
                          alt="Title"
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p>{item.name}</p>
                      <p className="mt-1 font-semibold">{item.quantity}</p>
                      <p className="mt-1 font-semibold">
                        {item.price * item.quantity} SAR
                      </p>
                    </div>
                  </figure>
                </div>
              ))}
            </article>
          ))}
        </main>
      </section>
    </>
  );
};

export default Orders;
