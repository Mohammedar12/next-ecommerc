"use client";

import React, { useState, useContext } from "react";
import AuthContext from "@/context/auth";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loginUser, clearErrors } = useContext(AuthContext);

  const router = useRouter();

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   await loginUser({ email, password });
  // };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await loginUser({ email, password });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Button disabled={isLoading}>
        {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
        <Link href={"/sign-up"}>Create A New Account</Link>
      </Button>
    </div>
  );
}

// const Login = () => {

//   return (
//     <div
//       style={{ maxWidth: "480px" }}
//       className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
//     >
//       <form onSubmit={submitHandler}>
//         <h2 className="mb-5 text-2xl font-semibold">Login</h2>

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
//             minLength={1}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
//         >
//           Login
//         </button>

//         <hr className="mt-4" />

//         <p className="text-center mt-5">
//           Don't have an account?{" "}
//           <Link href="/sing-up" className="text-blue-500">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
