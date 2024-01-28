"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addToCart = async ({
    id,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) => {
    const item = {
      id,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find((i) => i.id === item.id);

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i?.id === isItemExist?.id ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
    handelCartTotal();
  };

  const removeFromCart = async (id) => {
    // let newCartItems;
    const filterCart = cart?.cartItems?.filter((item) => id !== item.id);
    localStorage.setItem("cart", JSON.stringify({ cartItems: filterCart }));
    
    console.log(filterCart);
    setCartToState();
  };

  const handelCartTotal = async () => {
    const priceArray = cart?.cartItems?.map((item) => item.price);
    const res = priceArray?.reduce((i, e) => {
      return i + e;
    }, 0);

    setCartTotal(res);
  };

  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();

  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartTotal,
        setCart,
        setCartTotal,
        handelCartTotal,
        removeFromCart,
        saveOnCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
