"use client";

import Image from "next/image";

import { useState, useEffect } from "react";

import Banner from "@/components/Banners/Banners";
import Banner2 from "@/components/Banners/Banner2";
import Footer from "@/section/Footer/Footer";

import axios from "axios";
import PopularPorducts from "@/section/PopularPorducts/PopularPorducts";
import NewCollection from "@/section/NewCollection/NewCollection";

export default function Home() {
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
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <Banner />
      <PopularPorducts products={products} />
      <Banner2 />
      <NewCollection products={products} />
    </main>
  );
}
