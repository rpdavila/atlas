"use client";
import { useAppSelector } from "@/app/redux/hooks";

import SelectSearchOptions from "../searchForm/selectSearchOptions";
import StudentForm from "../forms/studentForm";
import InstrumentForm from "../forms/instrumentForm";

export default function SideBar() {
  const selectOption = useAppSelector((state) => state.searchOptions.type);

  function getFormComponent(selectOption: string) {
    switch (selectOption) {
      case "Search Student":
        return (
          <StudentForm formTitle="Search Student" buttonText="Search Student" />
        );

      case "Search Instrument":
        return (
          <InstrumentForm
            formTitle="Search Instrument"
            buttonText="Search Instrument"
          />
        );

      case "Add Student":
        return <StudentForm formTitle="Add Student" buttonText="Add Student" />;

      case "Add Instrument":
        return (
          <InstrumentForm
            formTitle="Add Instrument"
            buttonText="Add Instrument"
          />
        );
    }
  }
  return (
    <aside className="flex flex-col basis-1/4 items-center bg-slate-700 mt-2 ml-2 rounded-lg">
      <SelectSearchOptions>
        {getFormComponent(selectOption)}
      </SelectSearchOptions>
    </aside>
  );
}
