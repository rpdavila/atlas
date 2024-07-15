"use client";
// react imports
import React, { useState } from "react";

//redux imports
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSearch } from "@/lib/ReduxSSR/features/searchOptionsSlice";
import { addInstrument } from "@/lib/ReduxSSR/features/instrumentSLice";

//compnent imports
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { InstrumentDetails, RentStatus } from "@/app/types/formTypes";
import InstrumentSearchForm from "./instrumentSearchFrom";

export default function InstrumentForm({
  formTitle,
}: {
  formTitle: string
}) {
  const dispatch = useAppDispatch();
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  const searchResult = useAppSelector((state) => state.searchOptions.search);
  const instrumentDetialsLoading = useAppSelector(
    (state) => state.instruments.loading
  );
  const initialState: InstrumentDetails = {
    classification: "",
    brand: "",
    serialNumber: "",
    rentStatus: RentStatus.Available,
    assignedTo: undefined,
  };

  const [instrumentDetails, setInstrumentDetails] =
    useState<InstrumentDetails>(initialState);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    selectOption === "Search Instrument"
      ? dispatch(setSearch(value))
      : setInstrumentDetails({ ...instrumentDetails, [name]: value });
  };

  const handleClick = async () => {
    await dispatch(
      addInstrument({
        classification: instrumentDetails.classification,
        brand: instrumentDetails.brand,
        serialNumber: instrumentDetails.serialNumber,
        rentStatus: instrumentDetails.rentStatus,
      }));
    alert(`Instrument added to database`);
    setInstrumentDetails(initialState);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInstrumentDetails({ ...instrumentDetails, [name]: value });
  };
  return (
    <div className="flex flex-col bg-white rounded-lg items-center w-full h-screen md:h-auto">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      <section className="w-full">
        <InstrumentSearchForm />
      </section>

      {selectOption === "Add Instrument" && (
        <div className="flex flex-col justify-center items-center w-2/3 gap-4 mt-20 sm:w-2/3 md:w-full md:mt-2">
          <Input
            name="classification"
            label="Classification"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter Instrument Type"
            value={instrumentDetails.classification}
            onChange={handleChange}
            isClearable
            className="w-full mt-2"
            onClear={() => setInstrumentDetails({ ...instrumentDetails, classification: "" })}
          />
          <Input
            name="brand"
            label="Brand"
            labelPlacement="outside"
            variant="bordered"
            value={instrumentDetails.brand}
            placeholder="Instrument Brand"
            onChange={handleChange}
            isClearable
            className="w-full"
            onClear={() => setInstrumentDetails({ ...instrumentDetails, brand: "" })}
          />
          <Input
            name="serialNumber"
            label="Serial Number"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter Serial Number"
            value={instrumentDetails.serialNumber}
            onChange={handleChange}
            isClearable
            onClear={() => setInstrumentDetails({ ...instrumentDetails, serialNumber: "" })}
            className="w-full"
          />
          <Select
            name="rentStatus"
            label="Instrument Rent Status"
            labelPlacement="outside"
            variant="bordered"
            value={instrumentDetails.rentStatus}
            onChange={handleSelect}
          >
            {Object.keys(RentStatus).map((key) => (
              <SelectItem key={key}>{key}</SelectItem>
            ))}
          </Select>
          <Button
            className="w-full md:rounded-lg"
            color="primary"
            isLoading={instrumentDetialsLoading}
            onClick={handleClick}
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            {instrumentDetialsLoading ? "Submitting" : "Submit"}
          </Button>
        </div>
      )}
    </div>
  );
}
