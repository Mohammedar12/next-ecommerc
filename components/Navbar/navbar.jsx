"use client";

import { useState, useEffect, useContext } from "react";

import logo from "../../assets/logo.png";
import Image from "next/image";
import CartContext from "@/context/cart";
import Link from "next/link";
import { deleteCookie, hasCookie } from "cookies-next";
import AuthContext from "@/context/auth";
import { useResize, isMobile } from "@/utils/helper";
import SearchModal from "../SearchModal/SearchModal";
import axios from "axios";

// mui

import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
} from "@mui/material";

// icons

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { CiSearch, CiMenuBurger } from "react-icons/ci";

function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [search, setSearch] = useState("");
  const [getSearched, setGetSearched] = useState();
  const [isAuth, setAuth] = useState(false);
  const { cart } = useContext(CartContext);
  const { user, setUser, setUserData, userData, logoutUser } =
    useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  // fetchCategories

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

  // resize function

  const { sm } = useResize() || {};

  // nav bottom

  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // serach

  // const getSearch = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:3001/products/?name=${search}`
  //     );
  //     setGetSearched(data);
  //   } catch (err) {
  //     console.log(err + "aihs");
  //   }
  // };

  useEffect(() => {
    if (hasCookie("user")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  // remove it later
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Drawer

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...state, [anchor]: open });
  };

  // menu

  const List = ({ className }) => {
    return (
      <>
        {sm ? (
          <div className="mt-14 mb-12 m-auto">
            <Image
              style={{
                width: "50px",
                height: "auto",
              }}
              src={logo}
              alt="logo"
            />
          </div>
        ) : null}

        <ul
          className={`flex gap-3 ${
            sm ? "flex-col text-center mx-auto py-3 px-16" : ""
          }`}
        >
          {categories?.map((item) => (
            <li className="" key={item._id}>
              <Link href={`/category/${item._id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {sm ? (
          <div>
            {!isAuth ? (
              <Link
                href="/login"
                className="flex items-center justify-center
               gap-[10px] my-[30px] mx-auto bg-black
                text-white p-2 w-[80%] rounded-md hover:text-white"
              >
                <AiOutlineUser /> Login
              </Link>
            ) : (
              <button
                onClick={logoutUser}
                className="flex items-center justify-center
               gap-[10px] my-[30px] mx-auto bg-black
                text-white p-2 w-[80%] rounded-md hover:text-white"
              >
                <AiOutlineUser /> Log Out
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  const RenderNav = () => {
    // check if the device is mobile

    if (isMobile()) {
      return null;
    }

    // check if the screen is small

    if (sm) {
      return (
        <>
          <li className="cart relative  ">
            <Link href="/cart">
              <AiOutlineShoppingCart />
            </Link>
            {cart && cart.cartItems && (
              <span className="absolute -top-2 start-[13px] text-[5px] rounded-full p-1 px-2 text-white bg-red-600">
                {cart.cartItems.length}
              </span>
            )}
          </li>
          <CiMenuBurger
            className="cursor-pointer"
            onClick={() => setDrawer(true)}
          />
        </>
      );
    }

    // Default case when not mobile and not sm

    if (!isAuth) {
      return (
        <>
          <li className="cart relative ">
            <Link href="/cart">
              <AiOutlineShoppingCart />
            </Link>
            {cart && cart.cartItems && (
              <span className="absolute -top-2 start-[13px] text-[5px] rounded-full p-1 px-2 text-white bg-red-600">
                {cart.cartItems.length}
              </span>
            )}
          </li>
          <li className="relative">
            <Link href="/login">
              <AiOutlineUser />
            </Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li className="cart relative">
          <Link href="/cart">
            <AiOutlineShoppingCart />
          </Link>
          {cart && cart.cartItems && (
            <span className="absolute -top-2 start-[13px] text-[5px] rounded-full p-1 px-2 text-white bg-red-600">
              {cart.cartItems.length}
            </span>
          )}
        </li>
        <Link href="/profile">
          <AiOutlineUser
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        </Link>
      </>
    );
  };

  return (
    <>
      <nav className="nav bg-[#F8F8F8] py-3 mx-2">
        <div className="container bg-white shadow-sm flex w-[96%] justify-between items-center py-5 px-7 rounded-sm">
          <div className="left_content">
            <div className="logo">
              <Link href="/">
                <Image
                  style={{
                    width: "50px",
                    height: "auto",
                  }}
                  src={logo}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="flex">
            {!sm ? (
              <List className={"links flex w-full justify-center gap-3"} />
            ) : null}
          </div>
          <div className="right_content">
            <ul className="flex w-full justify-between items-center gap-3 text-[22px]">
              {/* <li className="mobail_links">
                <Link>
                  <GoThreeBars />
                </Link>
              </li> */}
              <li className="search">
                <CiSearch onClick={() => setSearchModal(true)} />
              </li>
              <RenderNav />
              <SearchModal open={searchModal} close={setSearchModal} />
              {/* <li className="wishs relative">
                <Link href="/">
                  <AiOutlineHeart />
                </Link>
                <span className="absolute -top-2 start-[20px] text-[5px] rounded-full p-1 px-2 text-white bg-red-600">
                  1
                </span>
              </li> */}
            </ul>
          </div>
        </div>

        <Drawer
          anchor={isMobile() ? "bottom" : "right"}
          open={drawer}
          onClose={() => setDrawer(false)}
        >
          <List className="links flex w-[200px] justify-center items-center gap-3 flex-col !m-auto " />
        </Drawer>
      </nav>
      {isMobile() ? (
        <div className="fixed left-[50%] bottom-[10px] translate-x-[-50%] z-50 shadow-xl rounded-[30px]">
          <BottomNavigation
            className="!bg-[#2f2f29] "
            sx={{ width: "300px", borderRadius: "10px" }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              className=" !text-[#fff]"
              sx={{ borderRadius: "10px" }}
              label="Cart"
              value="cart"
              icon={
                <div className="cart relative">
                  <Link href="/cart">
                    <AiOutlineShoppingCart />
                  </Link>
                  {!cart?.cartItems?.length == undefined ? (
                    <span className="absolute -top-2 start-[13px] text-[5px] rounded-full p-1 px-2 text-white bg-red-600">
                      {cart?.cartItems?.length == undefined
                        ? 0
                        : cart?.cartItems?.length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              }
            />

            <BottomNavigationAction
              className=" !text-[#fff]"
              sx={{ borderRadius: "10px" }}
              label=""
              value=""
              icon={
                <CiMenuBurger
                  className="cursor-pointer"
                  onClick={() => setDrawer(true)}
                />
              }
            />
            <BottomNavigationAction
              className=" !text-[#fff]"
              sx={{ borderRadius: "10px" }}
              label="User"
              value="user"
              icon={<AiOutlineUser />}
            />
          </BottomNavigation>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
