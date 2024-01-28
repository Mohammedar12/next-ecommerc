"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://localhost:3001/products";
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          token: "sbbs76bgsyegfyrbfyue",
        },
      });
      setProducts(res.data);
      console.log(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 ">
        {products?.map((item) => (
          <div className="" key={item._id}>
            <div className="w-[100%]">
              {item?.images.map((img) => (
                <img src={img?.url} alt="" />
              ))}
            </div>
            <div className="">
              <div className="">{item.name}</div>
              <div className="">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default page;
