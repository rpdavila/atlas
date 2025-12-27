"use client"
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
//type 
import { RentStatus } from "@prisma/client";
//auth imports

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import StudentSearchForm from "../forms/studentSearchForm";

import SchoolSelectForm from "../forms/schoolSelectForm";
// actions imports`



type Student = {
  school: {
    name: string;
  } | null;
  id: string;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
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
};

type Students = Student[]

export default function SearchStudents({ displayStudents }: { displayStudents: Students }) {

  let studentSearchResults: Students = [];
  //grab search field
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const schoolList = useAppSelector((state: RootState) => state.userInfo.schools);

  if (displayStudents) {
    studentSearchResults = displayStudents?.filter((student: Student) => {
      return (
        student?.firstName.includes(searchField) ||
        student?.lastName.includes(searchField) ||
        student?.studentIdNumber.includes(searchField) ||
        student?.school?.name.includes(searchField)
      );
    });
  }

  return (
    <section className="flex flex-col w-full min-h-screen items-center p-4 gap-4">
      <section className="flex flex-col w-full gap-2  md:hidden">
        <StudentSearchForm />
        <SchoolSelectForm schools={schoolList} />
      </section>
      <StudentCardList studentSearchResult={studentSearchResults} />
    </section>
  );
}