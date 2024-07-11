"use client";
//react imports
import React, { useState } from "react";
// redux imports
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSearch } from "@/lib/ReduxSSR/features/searchOptionsSlice";
import { addStudent } from "@/lib/ReduxSSR/features/studentListSlice";
//component imports

import { StudentInfo } from "@/app/types/formTypes";
import { Input, Button } from "@nextui-org/react";

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
  const studentInfoLoading = useAppSelector((state) => state.students.loading);
  const initialState: StudentInfo = {
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

  const handleAddStudent = async () => {
    await dispatch(
      addStudent({
        firstName: studentInfo.firstName,
        lastName: studentInfo.lastName,
        studentIdNumber: studentInfo.studentIdNumber,
      })
    );
    setStudentInfo(initialState);
  };

  return (
    <div className="flex flex-col bg-white rounded-lg items-center mt-2 w-full h-screen md:h-auto">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      {/* Move to searchStudent Component */}
      {/* {selectOption === "Search Student" && (
        <div>
          <TextInput
            labelName="Search"
            type="text"
            name="search"
            value={searchResult}
            placeHolder="Search Student"
            onChange={handleChange}
          />
        </div>
      )} */}
      {selectOption === "Add Student" && (
        <div className="flex flex-col justify-center items-center w-1/2 gap-4 mt-20 sm:w-full md:w-full md:mt-2">
          <Input
            name="firstName"
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter first name"
            variant="bordered"
            value={studentInfo.firstName}
            onChange={handleChange}
            isClearable
            onClear={() => setStudentInfo({ ...studentInfo, firstName: "" })}
            className="w-full"
          />

          <Input
            name="lastName"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter last name"
            variant="bordered"
            value={studentInfo.lastName}
            onChange={handleChange}
            isClearable
            onClear={() => setStudentInfo({ ...studentInfo, lastName: "" })}
            className="w-full"
          />

          <Input
            name="studentIdNumber"
            label="Student Id Number"
            labelPlacement="outside"
            placeholder="Enter Student Id Number"
            variant="bordered"
            value={studentInfo.studentIdNumber}
            onChange={handleChange}
            isClearable
            onClear={() => setStudentInfo({ ...studentInfo, lastName: "" })}
            className="w-full"
          />

          <Button
            className="w-full md:rounded-lg"
            color="primary"
            isLoading={studentInfoLoading}
            onClick={handleAddStudent}
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
            {studentInfoLoading ? "Submitting" : "Submit"}
          </Button>
        </div>
      )}

    </div>
  );
}
