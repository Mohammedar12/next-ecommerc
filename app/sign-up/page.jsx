// "use client";

// import Link from "next/link";
// import React, { useState, useContext, useEffect } from "react";
// import AuthContext from "@/context/auth";
// import { toast } from "react-toastify";

// export default function Page() {
//   const { error, registerUser, clearErrors } = useContext(AuthContext);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       clearErrors();
//     }
//   }, [error]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     registerUser({ name, email, password });
//   };

//   return (
//     <div
//       style={{ maxWidth: "480px" }}
//       className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
//     >
//       <form onSubmit={submitHandler}>
//         <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

//         <div className="mb-4">
//           <label className="block mb-1"> Full Name </label>
//           <input
//             className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//             type="text"
//             placeholder="Type your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1"> Email </label>
//           <input
//             className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//             type="text"
//             placeholder="Type your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1"> Password </label>
//           <input
//             className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//             type="password"
//             placeholder="Type your password"
//             minLength={6}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
//         >
//           Register
//         </button>

//         <hr className="mt-4" />

//         <p className="text-center mt-5">
//           Already have an account?
//           <Link href="/login" className="text-blue-500">
//             Sign in
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/AuthForm/sign-up";

import banner from "@/assets/banner_1.jpg";

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="">
        <Image
          src="/assets/banner_1.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative flex h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden flex-col bg-muted  text-white lg:flex dark:border-r">
          <div className="relative z-20 mt-auto">
            <Image
              src={banner}
              width={1280}
              height={843}
              alt="Authentication"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
