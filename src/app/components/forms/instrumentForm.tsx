"use client";
import React, { useState } from "react";

import TextInput from "../input/customTextInput";
import Button from "../button/button";
import Select from "../input/customSelection";

import { InstrumentDetails, RentStatus } from "@/app/types/formTypes";

type InstrumentFormProps = {
  formTitle: string;
};

export default function InstrumentForm({ formTitle }: InstrumentFormProps) {
  const [instrumentDetails, setInstrumentDetails] = useState<InstrumentDetails>(
    {
      id: 1,
      type: "",
      brand: "",
      serialNumber: "",
      rentStatus: RentStatus.Available,
      assignedTo: null,
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInstrumentDetails({ ...instrumentDetails, [name]: value });
    // query or mutations goes here
    // convert to redux
  };
  return (
    <div className="flex flex-col bg-white rounded-lg items-center w-full pb-2 mt-2">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
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
      <Button type="submit" width="60" name="submit" />
    </div>
  );
}
