"use client";

import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addStudentToList } from "@/app/redux/features/studentListSlice";

import TextInput from "../input/customTextInput";
import Button from "../button/button";
import { StudentInfo } from "@/app/types/formTypes";
import { setSearch } from "@/app/redux/features/searchOptionsSlice";

type StudentFormProps = {
  formTitle: string;
  buttonText: string;
};

export default function StudentForm({
  formTitle,
  buttonText,
}: StudentFormProps) {
  const dispatch = useAppDispatch();
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  const searchResult = useAppSelector((state) => state.searchOptions.search);

  const initialState: StudentInfo = {
    id: 1,
    firstName: "",
    lastName: "",
    studentIdNumber: "",
    instrument: undefined,
  };

  const [studentInfo, setStudentInfo] = useState<StudentInfo>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    selectOption === "Search Student"
      ? dispatch(setSearch(value))
      : setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleAddStudent = () => {
    dispatch(addStudentToList(studentInfo));
    alert("Student Added");
  };

  return (
    <div className="flex flex-col bg-white rounded-lg items-center w-full pb-2 mt-2">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      {selectOption === "Search Student" && (
        <div>
          <TextInput
            labelName="Search"
            type="text"
            name="search"
            value={searchResult}
            placeHolder="Search Instrument"
            onChange={handleChange}
          />
        </div>
      )}
      {selectOption === "Add Student" && (
        <div>
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
            placeHolder="Student ID Number"
            onChange={handleChange}
          />

          <Button
            type="submit"
            marginTop="5"
            name={buttonText}
            onClick={handleAddStudent}
          />
        </div>
      )}
    </div>
  );
}
