import { Suspense } from "react";
import { StudentList } from "@/app/types/formTypes";
import StudentCard from "../cards/studentCard";
import Loading from "@/app/components/loading/loading";



type CardListProps = {
  studentSearchResult: StudentList;
};

export default function StudentCardListSuspenseWrapper({ studentSearchResult }: CardListProps) {

  return (
    <Suspense fallback={<Loading />}>
      <StudentCardList studentSearchResult={studentSearchResult} />
    </Suspense>
  );
}

function StudentCardList({
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
