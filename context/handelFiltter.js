"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterType, setFilterType] = useState({
    gender: [],
    size: [],
    neckType: [],
  });

  return (
    <FilterContext.Provider
      value={{
        filterType,
        setFilterType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
