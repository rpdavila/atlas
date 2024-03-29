import InstrumentCard from "../cards/instrumentCard";
import { InstrumentList, StudentList } from "@/app/types/formTypes";
import StudentCard from "../cards/studentCard";

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
          return <InstrumentCard key={items.id} instrument={items} />;
        })}
      {selectOption === "Search Student" &&
        studentSearchResult?.map((items) => {
          return <StudentCard key={items.id} student={items} />;
        })}
    </>
  );
}
