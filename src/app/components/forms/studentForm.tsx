"use client";

import React from "react";

import { RootState } from "@/app/redux/store";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addStudent } from "@/app/redux/features/studentListSlice";

import TextInput from "../input/customTextInput";
import Button from "../button/button";

type StudentFormProps = {
  formTitle: string;
  buttonText: string;
};

export default function StudentForm({
  formTitle,
  buttonText,
}: StudentFormProps) {
  const dispatch = useAppDispatch();

  const selectStudentInfo = useAppSelector(
    (state: RootState) => state.students.studentInfo
  );
  const selectStudentList = useAppSelector(
    (state: RootState) => state.students.studentList
  );
  const selectAddStudentOption = useAppSelector(
    (state: RootState) => state.searchOptions.addStudent
  );

  const selectSearchStudentOption = useAppSelector(
    (state: RootState) => state.searchOptions.searchStudent
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (selectAddStudentOption || selectSearchStudentOption) {
      dispatch(addStudent({ ...selectStudentInfo, [name]: value }));
    }
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
        value={selectStudentInfo.firstName}
        placeHolder="First Name"
        onChange={handleChange}
      />
      <TextInput
        type="text"
        labelName="Last Name"
        name="lastName"
        value={selectStudentInfo.lastName}
        placeHolder="Last Name"
        onChange={handleChange}
      />
      <TextInput
        labelName="Student ID Number"
        type="text"
        name="studentIdNumber"
        value={selectStudentInfo.studentIdNumber}
        placeHolder="Student Number"
        onChange={handleChange}
      />

      <Button type="submit" width="60" name={buttonText} />
    </div>
  );
}
