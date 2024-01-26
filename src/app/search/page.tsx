"use client";
import { Suspense } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";

import CardList from "../components/card-list/cardList";

export default function Search() {
  const displayStudents = useAppSelector(
    (state: RootState) => state.students.studentList
  );

  const displayInstruments = useAppSelector(
    (state: RootState) => state.instruments.instrumentList
  );

  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );

  const searchfield = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const instrumentSearchResults = displayInstruments.filter((instrument) => {
    return (
      instrument.type?.includes(searchfield) ||
      instrument.brand?.includes(searchfield) ||
      instrument.serialNumber?.includes(searchfield) ||
      instrument.rentStatus.includes(searchfield)
    );
  });

  const studentSearchResults = displayStudents.filter((student) => {
    return (
      student.firstName?.includes(searchfield) ||
      student.lastName?.includes(searchfield) ||
      student.studentIdNumber?.includes(searchfield)
    );
  });

  return (
    <main className="flex min-h-screen justify-center items-center flex-col basis-3/4 mt-2 rounded-lg">
      <Suspense fallback={<p>Loading...</p>}>
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
      </Suspense>
    </main>
  );
}
