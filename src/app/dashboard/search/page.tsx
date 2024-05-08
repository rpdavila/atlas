"use client";
// react imports
import { useEffect, useRef } from "react";

//redux imports
import { useAppSelector, useAppDispatch, useAppStore } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";
//component imports
import CardList from "../../components/card-list/cardList";

export default function Search() {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(getStudents())
    store.dispatch(getInstruments())
    store.dispatch(getDropDownList())
    initialized.current = true
  }
  
  // Grab student list in store
  const displayStudents = useAppSelector(
    (state: RootState) => state.students
  );
  // Grab instrument list in store
  const displayInstruments = useAppSelector(
    (state: RootState) => state.instruments
  );

  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );

  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const instrumentSearchResults = displayInstruments.instrumentList?.filter((instrument: { classification: string | any[]; brand: string | any[]; serialNumber: string | any[]; rentStatus: string | any[]; }) => {
    return (
      instrument.classification?.includes(searchField) ||
      instrument.brand?.includes(searchField) ||
      instrument.serialNumber?.includes(searchField) ||
      instrument.rentStatus.includes(searchField)
    );
  });

  const studentSearchResults = displayStudents.studentList?.filter((student: { firstName: string | any[]; lastName: string | any[]; studentIdNumber: string | any[]; }) => {
    return (
      student.firstName?.includes(searchField) ||
      student.lastName?.includes(searchField) ||
      student.studentIdNumber?.includes(searchField)
    );
  });
  
  return (
      
      <section className="flex flex-col basis-3/4 items-center">
        {selectOption === "Search Instrument" &&  (
            <CardList
              instrumentSearchResults={instrumentSearchResults}
              selectOption={selectOption}
            />
          )}

        {selectOption === "Search Student" && (
            <CardList
              studentSearchResult={studentSearchResults}
              selectOption={selectOption}
            />
          )}
        
      </section>
    
  );
}
