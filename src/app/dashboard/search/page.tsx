"use client";
// react imports
import { useEffect } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";
//component imports
import CardList from "../../components/card-list/cardList";
import Loading from "@/app/components/loading/loading";

export default function Search() {
  const dispatch = useAppDispatch();
  
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

  const instrumentSearchResults = displayInstruments.instrumentList?.filter(instrument => {
    return (
      instrument.classification?.includes(searchField) ||
      instrument.brand?.includes(searchField) ||
      instrument.serialNumber?.includes(searchField) ||
      instrument.rentStatus.includes(searchField)
    );
  });

  const studentSearchResults = displayStudents.studentList?.filter((student) => {
    return (
      student.firstName?.includes(searchField) ||
      student.lastName?.includes(searchField) ||
      student.studentIdNumber?.includes(searchField)
    );
  });

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getInstruments());
      await dispatch(getStudents());
      await dispatch(getDropDownList())
    };
    loadData();  
  }, [dispatch]);
  
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
