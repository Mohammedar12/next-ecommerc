import { CartProvider } from "@/context/cart";
import { AuthProvider } from "@/context/auth";
import { FilterProvider } from "@/context/handelFiltter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
          <FilterProvider>{children}</FilterProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
