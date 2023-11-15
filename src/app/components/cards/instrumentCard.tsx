"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

import { InstrumentDetails, StudentInfo } from "@/app/types/formTypes";

import Select from "../input/customSelection";
import { studentList } from "@/app/data/studentDetails";

type CardProps = {
  instrument?: InstrumentDetails;
};

export default function InstrumentCard({ instrument }: CardProps) {
  const handleSelect = () => {};

  return (
    <div className="flex flex-row justify-evenly bg-white w-3/4 rounded-lg m-4 basis-1/3">
      <div className="flex flex-col w-1/3 items-center justify-center">
        <h1 className="text-2xl font-bold">{instrument?.type}</h1>
        <p>
          <strong>Brand: </strong>
          {instrument?.brand}
        </p>
        <p>
          <strong>Serial Number: </strong>
          {instrument?.serialNumber}
        </p>
        <p>
          <strong>Rent Status: </strong>
          {instrument?.rentStatus}
        </p>
      </div>
      {instrument?.rentStatus === "Rented" ? (
        <div className="flex flex-col">
          <p>
            <strong>First Name:</strong>
            {instrument.assignedTo?.firstName}
          </p>
          <p>
            <strong>Last Name: </strong> {instrument.assignedTo?.lastName}
          </p>
          <p>
            <strong>Student Id Number: </strong>
            {instrument.assignedTo?.studentIdNumber}
          </p>
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
