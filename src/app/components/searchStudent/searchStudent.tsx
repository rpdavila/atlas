"use client"
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";


//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import { StudentWithoutUserId, StudentListWithoutUserId } from "@/app/types/formTypes";
import StudentSearchForm from "../forms/studentSearchForm";




export default function SearchStudents({
  displayStudents
}: {
  displayStudents: StudentListWithoutUserId;

}) {

  let studentSearchResults: StudentListWithoutUserId = [];
  //grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  if (!!displayStudents) {
    studentSearchResults = displayStudents?.filter((student: StudentWithoutUserId) => {
      return (
        student.firstName.includes(searchField) ||
        student.lastName.includes(searchField) ||
        student.studentIdNumber.includes(searchField) ||
        student.school?.name.includes(searchField)
      );
    });
  }

  return (
    <section className={`flex flex-col basis-3/4 w-full ${studentSearchResults.length > 4 ? "h-full" : "h-screen"} items-center p-1 gap-1`}>
      <section className="w-full md:hidden">
        <StudentSearchForm />
      </section>
      <StudentCardList studentSearchResult={studentSearchResults} />
    </section>
  );
}