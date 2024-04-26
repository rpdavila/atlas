"use client";
// react imports
import { useEffect } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { getStudents } from "@/app/redux/features/studentListSlice";
import { getInstruments } from "@/app/redux/features/instrumentSLice";
//component imports
import CardList from "../../components/card-list/cardList";
import Loading from "@/app/components/loading/loading";

export default function Search() {
  const dispatch = useAppDispatch();
  
  // Grab student list in store
  const displayStudents = useAppSelector(
    (state: RootState) => state.students.studentList
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
  const instrumentSearchResults = displayInstruments.instrumentList.filter((instrument) => {
    return (
      instrument.classification?.includes(searchField) ||
      instrument.brand?.includes(searchField) ||
      instrument.serialNumber?.includes(searchField) ||
      instrument.rentStatus.includes(searchField)
    );
  });

  const studentSearchResults = displayStudents?.filter((student) => {
    return (
      student.firstName?.includes(searchField) ||
      student.lastName?.includes(searchField) ||
      student.studentIdNumber?.includes(searchField)
    );
  });

  useEffect(() => {
    Promise.all([dispatch(getInstruments()), dispatch(getStudents())])
        .then(() => {
          console.log("Data loaded");
        })
        .catch((err) => {
          console.error(err);
        });

  }, [dispatch]);
  
  return (
      
      <section className="flex flex-col basis-3/4">
        {displayInstruments.loading? (<Loading/>): 
        selectOption === "Search Instrument" &&  (
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
