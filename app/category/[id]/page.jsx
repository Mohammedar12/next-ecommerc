"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"; // Import axios for making API requests
import ProdauctCard from "@/components/ProdauctCard/ProdauctCard";

import Filter from "@/components/Filter/Filter";
import { useResize, isMobile } from "@/utils/helper";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Drawer } from "@mui/material";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import FilterContext from "@/context/handelFiltter";

function Category() {
  const [drawer, setDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0); // Added loading state
  const [page, setPage] = useState(6);

  const loadingRef = useRef(null);

  const params = useParams();

  const { filterType, setFilterType } = useContext(FilterContext);
  const { gender, neckType, size } = filterType;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const genderQuery = gender ? `&gender=${gender}` : "";
        const neckTypeQuery = neckType ? `&neckType=${neckType}` : "";
        const sizeQuery = size ? `&size=${size}` : "";
        const queries = `${genderQuery}${neckTypeQuery}${sizeQuery}`;

        const url = `${process.env.base_url}/products/${params.id}?pageSize=${page}${queries}`;
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            token: "sbbs76bgsyegfyrbfyue",
          },
        });

        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }

      console.log(params);
    };

    fetchProducts();
    fetchTotalProducts();
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [params.id, page, filterType]); // Added id to dependency array

  const fetchTotalProducts = async () => {
    try {
      const url = `${process.env.base_url}/productsCount/${params.id}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          token: "sbbs76bgsyegfyrbfyue",
        },
      });
      setTotalProducts(data.count);
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  const loadProducts = () => {
    setPage((prevPage) => prevPage + 4);
  };

  const handleScroll = () => {
    if (
      loadingRef.current &&
      loadingRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      loadProducts();
    }
  };

  const { sm } = useResize();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <div className="flex items-center flex-col">
      <div className={`container py-10 px-4 ${!sm ? "flex gap-5" : ""}`}>
        {!sm ? (
          <Filter Expanded={true} />
        ) : (
          <>
            <button
              className="flex gap-3 bg-[#f8f8f8] p-4 rounded-md my-6"
              onClick={() => setDrawer(true)}
            >
              <IoFilterCircleOutline className="text-[25px]" />
              Filter
            </button>
            <Drawer
              anchor={"left"}
              open={drawer}
              onClose={() => setDrawer(false)}
            >
              <div className="flex px-5">
                <Filter Expanded={true} close={setDrawer} sm={sm} />
              </div>
            </Drawer>
          </>
        )}

        <div className="grid gap-7 grid-cols-2 md:grid-cols-3 justify-center">
          {products.map((product, index) => (
            <ProdauctCard className={"flex-1"} key={index} product={product} />
          ))}
        </div>
      </div>
      {page < totalProducts && <div ref={loadingRef}>Loading...</div>}
    </div>
  );
}

export default Category;
