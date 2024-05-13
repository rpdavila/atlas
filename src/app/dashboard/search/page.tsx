"use client";
// react imports
import { Suspense, useRef } from "react";

//redux imports
import { useAppSelector, useAppStore } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";
//component imports
import CardList from "../../components/card-list/cardList";
import Loading from "../../components/loading/loading";

export default function Search() {
  // initialize the store in the client side from the server side
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
  // grab the selection option
  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );

  // grab searchfield
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
        <Suspense fallback={<Loading/>}>
          <CardList
            instrumentSearchResults={instrumentSearchResults}
            selectOption={selectOption}
          />
        </Suspense>
        )}

      {selectOption === "Search Student" && (
        <Suspense fallback={<Loading/>}>
          <CardList
            studentSearchResult={studentSearchResults}
            selectOption={selectOption}
          />
        </Suspense>
        )}        
    </section>    
  );
}
