"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function page() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="h-[75%] flex items-center justify-center">
      <div className="grid grid-cols-4 gap-3">
        {categories?.map((item) => (
          <div
            className="border-2 p-3 px-8 rounded-lg bg-slate-100"
            key={item._id}
          >
            <div className="">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
