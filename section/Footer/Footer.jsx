import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 z-[99]">
      <div className=" w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className=" text-gray-200 self-center text-2xl font-semibold whitespace-nowrap">
              Flowbite
            </span>
          </a>
          <ul className="flex flex-wrap gap-2 items-center mb-6 text-sm font-medium text-gray-200 sm:mb-0 ">
            <li>
              <a href="/" className="hover:underline  me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline  me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline  me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline ">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
