import React from "react";
import "./PopularPorducts.css";
import HeaderSection from "@/components/HeaderSection/HeaderSection";
import ProdauctCard from "@/components/ProdauctCard/ProdauctCard";

function PopularPorducts({ products }) {
  return (
    <>
      <HeaderSection>POPULAR PRODUCTS</HeaderSection>
      <div className="products_section">
        <div className="container flex items-center">
          {products.slice(0, 3).map((product) => (
            <ProdauctCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PopularPorducts;
