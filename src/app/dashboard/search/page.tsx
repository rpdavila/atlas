"use client";
// react imports
import { Suspense} from "react";

//redux imports
import { useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";

//component imports
import StudentCardListSuspenseWrapper from "../../components/card-list/studentCardList";
import InstrumentCardListSuspenseWrapper from "@/app/components/card-list/instrumentCardList";

export default function Search() {
 
  
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
      {selectOption === "Search Student" && <StudentCardListSuspenseWrapper studentSearchResult={studentSearchResults}/>}  
      {selectOption === "Search Instrument" && <InstrumentCardListSuspenseWrapper instrumentSearchResults={instrumentSearchResults}/>}       
    </section>    
  );
}
