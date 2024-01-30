"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState(null);
  const [erorr, setErorr] = useState(null);
  const [isOk, setIsOk] = useState();

  const router = useRouter();

  useEffect(() => {
    getAddress();
    console.log(localStorage.getItem("userID"));
    setUpdate(false);
    // setIsOk(false);
  }, [update]);

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/sing-up`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      if (data) {
        setUser(true);
        getUser();
        setCookie("user", data?.token);
        localStorage.setItem("userID", data?._id);
        router.push("/");
      }
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const loginUser = async ({ req, email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      if (data) {
        // console.log(data);
        setUser(true);
        getUser();
        getAddress();
        setCookie("user", data?.token);
        localStorage.setItem("userID", data?.userId);

        router.push("/");
      }
      console.log(userData, "as");
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const logoutUser = () => {
    deleteCookie("user");
    deleteCookie("session");
    setUser(false);
    localStorage.removeItem("userID");
    localStorage.removeItem("userData");
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.base_url}/profile/update?id=${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      if (data) {
        setLoading(false);
        setUser(true);
        getUser();
      }
    } catch (error) {
      setLoading(false);
      setErorr(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/user`, {
        headers: {
          "Content-Type": "application/json",
          token: process.env.TOKEN,
        },
        withCredentials: true,
      });
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const addAddress = async ({
    street,
    city,
    state,
    ZIPcode,
    phone_number,
    country,
  }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/address/new`,
        {
          street,
          city,
          state,
          ZIPcode,
          phone_number,
          country,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      if (data) {
        setUpdate(true);
      }
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/address`, {
        headers: {
          "Content-Type": "application/json",
          token: process.env.TOKEN,
        },
        withCredentials: true,
      });
      setAddress(data);
      // console.log(data);
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const getOrderAddress = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/address`, {
        headers: {
          "Content-Type": "application/json",
          token: process.env.TOKEN,
        },
        withCredentials: true,
      });
      setAddress(data);
      // console.log(data);
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const updateAddress = async (id, address) => {
    try {
      console.log(id);
      const data = await axios.put(
        `${process.env.base_url}/address/update/${id}`,
        address,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      setUpdate(true);

      setIsOk(data.status);
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const deletAddress = async (id) => {
    try {
      console.log(id);
      const data = await axios.delete(
        `${process.env.base_url}/address/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      setUpdate(true);
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        user,
        setUser,
        setUserData,
        userData,
        erorr,
        addAddress,
        address,
        updateAddress,
        setIsOk,
        isOk,
        loading,
        deletAddress,
        clearErrors,
        updateProfile,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
