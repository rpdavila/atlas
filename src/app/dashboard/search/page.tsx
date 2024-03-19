"use client";
// react imports
import { Suspense, useEffect } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { useMongoDbDataAccess } from "@/app/hooks/useMongoDbDataAccess";
import { RootState } from "@/app/redux/store";
import { getStudents } from "@/app/redux/features/studentListSlice";
import { getInstruments } from "@/app/redux/features/instrumentSLice";
//component imports
import Loading from "@/app/components/loading/loading";
import CardList from "../../components/card-list/cardList";

export default function Search() {
  const dispatch = useAppDispatch();
  // const students = useMongoDbDataAccess({ collectionName: "studentInfo" });
  // const instruments = useMongoDbDataAccess({
  //   collectionName: "instrumentInfo",
  // });
  // Grab student list in store
  const displayStudents = useAppSelector(
    (state: RootState) => state.students.studentList
  );
  // Grab instrument list in store
  const displayInstruments = useAppSelector(
    (state: RootState) => state.instruments.instrumentList
  );

  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );

  const searchfield = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const instrumentSearchResults = displayInstruments?.filter((instrument) => {
    return (
      instrument.classification?.includes(searchfield) ||
      instrument.brand?.includes(searchfield) ||
      instrument.serialNumber?.includes(searchfield) ||
      instrument.rentStatus.includes(searchfield)
    );
  });

  const studentSearchResults = displayStudents?.filter((student) => {
    return (
      student.firstName?.includes(searchfield) ||
      student.lastName?.includes(searchfield) ||
      student.studentIdNumber?.includes(searchfield)
    );
  });

  useEffect(() => {
    dispatch(getInstruments());
    dispatch(getStudents());
  }, [dispatch]);
  return (
    <section className="flex flex-col basis-3/4">
      {selectOption === "Search Instrument" && (
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
