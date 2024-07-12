"use client";
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

import SelectSearchOptions from "../searchForm/selectSearchOptions";
import StudentForm from "../forms/studentForm";
import InstrumentForm from "../forms/instrumentForm";

export default function SideBar() {
  const selectOption = useAppSelector((state) => state.searchOptions.type);

  function getFormComponent(selectOption: string) {
    switch (selectOption) {
      case "Search Student":
        return (
          <StudentForm formTitle="Search Student" />
        );

      case "Search Instrument":
        return (
          <InstrumentForm
            formTitle="Search Instrument"
          />
        );

      case "Add Student":
        return <StudentForm formTitle="Add Student" />;

      case "Add Instrument":
        return (
          <InstrumentForm
            formTitle="Add Instrument"
          />
        );
    }
  }
  return (
    <aside className="hidden sm:flex flex-col items-center m-2 rounded-lg w-full">
      <SelectSearchOptions>
        {getFormComponent(selectOption)}
      </SelectSearchOptions>
    </aside>
  );
}
