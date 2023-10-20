"use client";
import { useAppDispatch } from "@/app/redux/hooks";

import { InstrumentDetails } from "@/app/types/formTypes";
import { studentList } from "@/app/data/studentDetails";


import Select from "../input/customSelection";

type CardProps = {
  instrument: InstrumentDetails;
};
export default function Card({ instrument }: CardProps) {
  const dispatch = useAppDispatch();
  const handleSelect = () => {

  };
  return (
    <div className="flex flex-row bg-white">
      <div className="flex flex-col justify-center items-center border-white">
        <h1 className="text-2xl font-bold">{instrument.type}</h1>
        <p>{instrument.brand}</p>
        <p>{instrument.serialNumber}</p>
        <p>{instrument.rentStatus}</p>
      </div>
      {instrument.rentStatus === "Rented" ? (
        <div className="flex flex-col">
          <p>{instrument.assignedTo?.firstName}</p>
          <p>{instrument.assignedTo?.lastName}</p>
          <p>{instrument.assignedTo?.studentIdNumber}</p>
        </div>
      ) : (
        <Select
          category="Available Students"
          options={studentList}
          onChange={handleSelect}
          placeHolder="Available Students"
        />
      )}
    </div>
  );
}
