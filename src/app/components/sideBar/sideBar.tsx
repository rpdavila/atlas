"use client";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import SelectSearchOptions from "../searchForm/selectSearchOptions";
import StudentForm from "../forms/studentForm";
import InstrumentForm from "../forms/instrumentForm";
import React from "react";
export default function SideBar() {
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
    
  };
  return (
    <aside className="flex flex-col basis-1/4 items-center bg-slate-700 mt-2 rounded-lg">
      <SelectSearchOptions>
        <form onSubmit={onSubmit} className="w-full">
          {selectStudentOption && <StudentForm formTitle="Search Student" />}
          {selectInstrumentOption && (
            <InstrumentForm formTitle="Search Instrument" />
          )}
          {selectAddStudentOption && <StudentForm formTitle="Add Student" />}
          {selectAddInstrumentOption && (
            <InstrumentForm formTitle="Add Instrument" />
          )}
        </form>
      </SelectSearchOptions>
    </aside>
  );
}
