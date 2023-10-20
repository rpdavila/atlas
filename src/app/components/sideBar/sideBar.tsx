"use client";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
  addStudentToList,
  studentInfoReset,
} from "@/app/redux/features/studentListSlice";
import SelectSearchOptions from "../searchForm/selectSearchOptions";
import StudentForm from "../forms/studentForm";
import InstrumentForm from "../forms/instrumentForm";
import React from "react";
export default function SideBar() {
  const dispatch = useAppDispatch();

  const selectStudentInfo = useAppSelector(
    (state) => state.students.studentInfo
  );
  const selectStudentOption = useAppSelector(
    (state) => state.searchOptions.searchStudent
  );

  const selectInstrumentOption = useAppSelector(
    (state) => state.searchOptions.searchInstrument
  );

  const selectAddStudentOption = useAppSelector(
    (state) => state.searchOptions.addStudent
  );

  const selectAddInstrumentOption = useAppSelector(
    (state) => state.searchOptions.addInstrument
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectAddStudentOption && dispatch(addStudentToList(selectStudentInfo));
    selectAddStudentOption && dispatch(studentInfoReset());
  };
  return (
    <aside className="flex flex-col basis-1/4 items-center bg-slate-700 mt-2 rounded-lg">
      <SelectSearchOptions>
        <form onSubmit={onSubmit} className="w-full">
          {selectStudentOption && (
            <StudentForm
              formTitle="Search Student"
              buttonText="Search Student"
            />
          )}
          {selectInstrumentOption && (
            <InstrumentForm
              formTitle="Search Instrument"
              buttonText="Search Instrument"
            />
          )}
          {selectAddStudentOption && (
            <StudentForm formTitle="Add Student" buttonText="Add Student" />
          )}
          {selectAddInstrumentOption && (
            <InstrumentForm
              formTitle="Add Instrument"
              buttonText="Add Instrument"
            />
          )}
        </form>
      </SelectSearchOptions>
    </aside>
  );
}
