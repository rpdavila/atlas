
import { StudentList } from "@/app/types/formTypes";
import StudentCard from "../cards/studentCard";

type CardListProps = {
  studentSearchResult: StudentList | undefined;
};

export default function StudentCardList({
  studentSearchResult,
}: CardListProps) {
  return (
    <>
      {studentSearchResult?.map((items) => {
        return <StudentCard key={items._id} student={items} />;
      })}
    </>
  );
}
