"use client";

import React, { useState } from "react";

import { RootState } from "@/app/redux/store";
import { useAppSelector } from "../../redux/hooks";

import TextInput from "../input/customTextInput";
import Button from "../button/button";
import Select from "../input//customSelection";

import { StudentInfo } from "@/app/types/formTypes";
import { instrumentDetails } from "@/app/data/instrumentDetails";

type StudentFormProps = {
  formTitle: string;
};

export default function StudentForm({ formTitle }: StudentFormProps) {
  const selectAddStudentOption = useAppSelector(
    (state: RootState) => state.searchOptions.addStudent
  );
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    id: 1,
    firstName: "",
    lastName: "",
    studentIdNumber: "",
    instrument: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStudentInfo({ ...studentInfo, [name]: value });
    // query goes here
    // convert to redux
  };

  return (
    <div className="flex flex-col bg-white rounded-lg items-center w-full pb-2 mt-2">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      <TextInput
        labelName="First Name"
        type="text"
        name="firstName"
        value={studentInfo.firstName}
        placeHolder="First Name"
        onChange={handleChange}
      />
      <TextInput
        type="text"
        labelName="Last Name"
        name="lastName"
        value={studentInfo.lastName}
        placeHolder="Last Name"
        onChange={handleChange}
      />
      <TextInput
        labelName="Student ID Number"
        type="text"
        name="studentIdNumber"
        value={studentInfo.studentIdNumber}
        placeHolder="Student Number"
        onChange={handleChange}
      />

      <Button type="submit" width="60" name="submit" />
    </div>
  );
}
