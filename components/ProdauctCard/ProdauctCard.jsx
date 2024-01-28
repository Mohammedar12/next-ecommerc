"use client";
import React from "react";
// import "./ProdauctCard.css";
// import "animate.css";
import Link from "next/link";
import Image from "next/image";
import Tshirt from "../../assets/T-shirt.jpg";
import { TfiEye } from "react-icons/tfi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";

function ProdauctCard({ product, addCart, className, isActive }) {
  return (
    <div className={"w-[100%] text-center "}>
      <Link href={`/product/${product?._id}`}>
        <div className="image">
          <Image
            className="rounded-lg"
            // src={product.images[0]?.url}
            src={Tshirt}
            alt="pr"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </Link>

      <div className="mt-3">
        <div className="title">{product?.name}</div>
        <div className="price">{product?.price} </div>
      </div>
      {/* <ul className="action_links">
        <li className="icon quick_view_icon">
         
          <TfiEye />
          
        </li>
        <li className="icon wishlist-icon">
          <AiOutlineHeart />
        </li>
      </ul> */}
    </div>
  );
}

export default ProdauctCard;
