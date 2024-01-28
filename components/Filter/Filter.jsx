import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FilterContext from "@/context/handelFiltter";
import { IoIosArrowDown } from "react-icons/io";

function Filter({ Expanded, close, sm }) {
  const { filterType, setFilterType } = useContext(FilterContext);

  const { gender, neckType, size } = filterType;

  const formRef = useRef();

  const handelGenders = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);
      setFilterType({
        ...filterType,
        gender: gender ? [...gender, e.target.value] : [e.target.value],
      });
    } else {
      setFilterType({
        ...filterType,
        gender: gender?.filter((gen) => gen !== e.target.value) || [],
      });
    }
  };
  const handelNeckType = (e) => {
    if (e.target.checked) {
      setFilterType({
        ...filterType,
        neckType: neckType ? [...neckType, e.target.value] : [e.target.value],
      });
    } else {
      setFilterType({
        ...filterType,
        neckType: neckType?.filter((neck) => neck !== e.target.value) || [],
      });
    }
  };
  const handelSize = (e) => {
    if (e.target.checked) {
      setFilterType({
        ...filterType,
        size: size ? [...size, e.target.value] : [e.target.value],
      });
    } else {
      setFilterType({
        ...filterType,
        size: size?.filter((siz) => siz !== e.target.value) || [],
      });
    }
  };
  const handelReset = (e) => {
    e.preventDefault();
    setFilterType({
      gender: [],
      size: [],
      neckType: [],
    });
    // setRest(true);
  };

  const genderValues = ["Men", "Women"];
  const neckTypeValues = ["Polo", "Round", "V", "Crew"];
  const sizeValues = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    console.log(filterType);
  }, [filterType]);
  return (
    <form ref={formRef} className="w-[200px]">
      <Accordion className="w-[200px]" defaultExpanded={Expanded}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className=""
        >
          <p>Gender</p>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {genderValues.map((value) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    value={value}
                    onChange={(e) => handelGenders(e)}
                    checked={gender.includes(value)}
                  />
                }
                label={value}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="w-[200px]" defaultExpanded={Expanded}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className=""
        >
          <p> Neck/Collar Type</p>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {neckTypeValues.map((value) => (
              <FormControlLabel
                className="w-full"
                key={value}
                control={
                  <Checkbox
                    value={value}
                    onChange={(e) => handelGenders(e)}
                    checked={gender.includes(value)}
                  />
                }
                label={value}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="w-[200px]" defaultExpanded={Expanded}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className=""
        >
          <p>Size</p>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {sizeValues.map((value) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    value={value}
                    onChange={(e) => handelGenders(e)}
                    checked={gender.includes(value)}
                  />
                }
                label={value}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="flex justify-between mt-4">
        {sm ? (
          <button
            onClick={() => close(false)}
            className="bg-slate-800 rounded-md text-gray-200 py-2 px-4 "
          >
            Close
          </button>
        ) : (
          ""
        )}
        <button
          type="reset"
          onClick={handelReset}
          className="bg-slate-800 rounded-md text-gray-200 py-2 px-4 "
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default Filter;
