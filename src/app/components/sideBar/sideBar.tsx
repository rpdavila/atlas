"use client";
import { useAppSelector } from "@/app/redux/hooks";

import SelectSearchOptions from "../searchForm/selectSearchOptions";
import StudentForm from "../forms/studentForm";
import InstrumentForm from "../forms/instrumentForm";
import React from "react";

export default function SideBar() {
  const selectOption = useAppSelector((state) => state.searchOptions.type);

  return (
    <aside className="flex flex-col basis-1/4 items-center bg-slate-700 mt-2 rounded-lg">
      <SelectSearchOptions>
        {selectOption === "Search Student" && (
          <StudentForm formTitle="Search Student" buttonText="Search Student" />
        )}
        {selectOption === "Search Instrument" && (
          <InstrumentForm
            formTitle="Search Instrument"
            buttonText="Search Instrument"
          />
        )}
        {selectOption === "Add Student" && (
          <StudentForm formTitle="Add Student" buttonText="Add Student" />
        )}
        {selectOption === "Add Instrument" && (
          <InstrumentForm
            formTitle="Add Instrument"
            buttonText="Add Instrument"
          />
        )}
      </SelectSearchOptions>
    </aside>
  );
}
