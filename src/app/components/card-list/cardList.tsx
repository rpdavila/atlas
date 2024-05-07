import InstrumentCard from "../cards/instrumentCard";
import { InstrumentList, StudentList } from "@/app/types/formTypes";
import StudentCard from "../cards/studentCard";
import Loading from "@/app/components/loading/loading";
import { Suspense } from "react";

type CardListProps = {
  instrumentSearchResults?: InstrumentList;
  studentSearchResult?: StudentList;
  selectOption: "Search Student" | "Search Instrument";
};

export default function CardList({
  instrumentSearchResults,
  studentSearchResult,
  selectOption,
}: CardListProps) {
  return (
    <>
      
    {selectOption === "Search Instrument" &&
      instrumentSearchResults?.map((items) => {
        return <InstrumentCard key={items._id} instrument={items} />;
      })}
    {selectOption === "Search Student" &&
      studentSearchResult?.map((items) => {
        return <StudentCard key={items._id} student={items} />;
      })}
      </>
      
  );
}
