
import { StudentList } from "@/app/types/formTypes";
import StudentCard from "../cards/studentCard";
import Loading from "@/app/components/loading/loading";



type CardListProps = {
  studentSearchResult: StudentList;
};

// export default function StudentCardListSuspenseWrapper({ studentSearchResult }: CardListProps) {

//   return (

//     <StudentCardList studentSearchResult={studentSearchResult} />

//   );
// }

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
