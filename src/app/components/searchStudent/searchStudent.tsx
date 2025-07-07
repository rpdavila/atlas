"use client"
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";

//type 
import { RentStatus } from "@prisma/client";

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import StudentSearchForm from "../forms/studentSearchForm";


type Student = {
  school: {
    name: string;
  } | null;
  id: string;
  instrumentAssignment: {
    instrument: {
      school: {
        name: string;
      };
      id: string;
      classification: string;
      brand: string;
      serialNumber: string;
      rentStatus: RentStatus;
    };
  } | null;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
}

type Students = Student[]

export default function SearchStudents({
  displayStudents
}: {
  displayStudents: Students;

}) {

  let studentSearchResults: Students = [];
  //grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  if (!!displayStudents) {
    studentSearchResults = displayStudents?.filter((student: Student) => {
      return (
        student.firstName.includes(searchField) ||
        student.lastName.includes(searchField) ||
        student.studentIdNumber.includes(searchField) ||
        student.school?.name.includes(searchField)
      );
    });
  }

  return (
    <section className="flex flex-col w-full min-h-screen items-center p-4 gap-4">
      <section className="w-full md:hidden">
        <StudentSearchForm />
      </section>
      <StudentCardList studentSearchResult={studentSearchResults} />
    </section>
  );
}