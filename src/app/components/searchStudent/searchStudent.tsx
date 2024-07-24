"use client"
//redux imports
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
// import { getStudents } from "@/lib/ReduxSSR/features/studentListSlice";
// import { UnknownAction } from "@reduxjs/toolkit";

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import { StudentInfo, StudentList } from "@/app/types/formTypes";
import StudentSearchForm from "../forms/studentSearchForm";

export default function SearchStudent(
  {
    displayStudents
  }: {
    displayStudents: StudentList
  }
) {

  let studentSearchResults: StudentList = [];
  //grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  if (!!displayStudents) {
    studentSearchResults = displayStudents.filter((student: StudentInfo) => {
      return (
        student.firstName.includes(searchField) ||
        student.lastName.includes(searchField) ||
        student.studentIdNumber.includes(searchField)
      );
    });
  }

  return (
    <section className="flex flex-col basis-3/4 w-full items-center p-1 gap-1">
      <section className="flex w-full md:hidden">
        <StudentSearchForm />
      </section>
      <StudentCardList studentSearchResult={studentSearchResults} />
    </section>
  );
}