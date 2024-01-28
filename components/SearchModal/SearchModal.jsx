import React, { useState } from "react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
} from "@mui/material";

function SearchModal({ open, close }) {
  return (
    <>
      <Drawer
        className="bg-[#F8F8F8] h-[20vh]  "
        anchor={"top"}
        open={open}
        onClose={() => close(false)}
      >
        <div className="h-[20vh] flex">
          <div className="p-3 w-[90%] max-w-[600px] m-auto flex gap-3 ">
            <input
              className="p-3 w-full border-[1px] border-cyan-900 rounded-md shadow-lg focus:outline-none"
              type="search"
              name=""
              id=""
            />
            <button className="p-3 bg-slate-900 text-white shadow-lg rounded-md">
              Search
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default SearchModal;
