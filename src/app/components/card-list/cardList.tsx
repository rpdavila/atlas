"use client";
import { useAppSelector } from "@/app/redux/hooks";

import InstrumentCard from "../cards/instrumentCard";
import { InstrumentList, StudentList } from "@/app/types/formTypes";
import StudentCard from "../cards/studentCard";

type CardListProps = {
  instrumentSearchResults?: InstrumentList;
  studentSearchResult?: StudentList;
};
export default function CardList({
  instrumentSearchResults,
  studentSearchResult,
}: CardListProps) {
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  return (
    <>
      {selectOption === "Search Instrument" &&
        instrumentSearchResults?.map((items) => {
          return <InstrumentCard key={items.id} instrument={items} />;
        })}
      {selectOption === "Search Student" &&
        studentSearchResult?.map((items) => {
          return <StudentCard key={items.id} student={items} />;
        })}
    </>
  );
}
