"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

import { InstrumentDetails, StudentInfo } from "@/app/types/formTypes";

import Select from "../input/customSelection";
import { studentList } from "@/app/data/studentDetails";
import React from "react";

type CardProps = {
  instrument?: InstrumentDetails;
};

export default function InstrumentCard({ instrument }: CardProps) {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split(" ");
    // display students that are not selected
    const selectedStudent = studentList.filter((student) => {
      return student.firstName !== value.at(0);
    });
    
  };

  return (
    <div className="flex flex-row justify-evenly bg-white w-3/4 rounded-lg m-4 basis-1/3">
      <div className="flex flex-col w-1/3 items-start justify-center">
        <p>
          <strong>Instrument type: </strong>
          {instrument?.type}
        </p>
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
          placeHolder="Student List"
        />
      )}
    </div>
  );
}
