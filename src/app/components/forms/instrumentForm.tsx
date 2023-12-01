"use client";
import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { addInstrumentToList } from "@/app/redux/features/instrumentSLice";

import TextInput from "../input/customTextInput";
import Button from "../button/button";
import Select from "../input/customSelection";

import { InstrumentDetails, RentStatus } from "@/app/types/formTypes";
import { setSearch } from "@/app/redux/features/searchOptionsSlice";

type InstrumentFormProps = {
  formTitle: string;
  buttonText: string;
};

type SearchParameters = {
  searchParams: string;
  result: Array<InstrumentDetails>;
};

export default function InstrumentForm({
  formTitle,
  buttonText,
}: InstrumentFormProps) {
  const dispatch = useAppDispatch();
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  const searchResult = useAppSelector((state) => state.searchOptions.search);

  const getInstrumentList = useAppSelector(
    (state) => state.instruments.instrumentList
  );

  const initialState: InstrumentDetails = {
    id: 1,
    type: "",
    brand: "",
    serialNumber: "",
    rentStatus: RentStatus.Available,
    assignedTo: null,
  };

  const [instrumentDetails, setInstrumentDetails] =
    useState<InstrumentDetails>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    selectOption === "Search Instrument"
      ? dispatch(setSearch(value))
      : setInstrumentDetails({ ...instrumentDetails, [name]: value });
  };

  const handleClick = () => {
    dispatch(addInstrumentToList(instrumentDetails));
    setInstrumentDetails(initialState);
    alert(`${instrumentDetails} Added to database`);
  };
  return (
    <div className="flex flex-col bg-white rounded-lg items-center w-full pb-2 mt-2">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      {selectOption === "Search Instrument" && (
        <section>
          <TextInput
            labelName="Search"
            type="text"
            name="search"
            value={searchResult}
            placeHolder="Search Instrument"
            onChange={handleChange}
          />
        </section>
      )}
      {selectOption === "Add Instrument" && (
        <section>
          <TextInput
            labelName="Type"
            type="text"
            name="type"
            value={instrumentDetails.type}
            placeHolder="Instrument Type"
            onChange={handleChange}
          />
          <TextInput
            type="text"
            labelName="Brand"
            name="brand"
            value={instrumentDetails.brand}
            placeHolder="Instrument Brand"
            onChange={handleChange}
          />
          <TextInput
            labelName="Serial Number"
            type="text"
            name="serialNumber"
            value={instrumentDetails.serialNumber}
            placeHolder="Serial Number"
            onChange={handleChange}
          />
          <Select
            label="Instrument Rent Status"
            category="Instrument Select"
            placeHolder="Rent Status"
            options={RentStatus}
            onChange={handleChange}
          />
          <Button type="button" name={buttonText} onClick={handleClick} marginTop="5" />
        </section>
      )}
    </div>
  );
}
