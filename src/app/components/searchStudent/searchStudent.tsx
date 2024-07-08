"use client"
// react imports
import { useRef } from "react";

//redux imports
import { useAppSelector, useAppDispatch, useAppStore } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { UnknownAction } from "@reduxjs/toolkit";

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import { StudentInfo, StudentList } from "@/app/types/formTypes";
import Loading from "../loading/loading";

export default function SearchStudent() {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(getStudents() as unknown as UnknownAction);
    initialized.current = true;
  }

  let studentSearchResults: StudentList = [];

  // Grab student list in store
  const displayStudents: StudentList = useAppSelector(
    (state: RootState) => state.students.studentList
  );
  // grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  if (displayStudents) {
    studentSearchResults = displayStudents.filter((student: StudentInfo) => {
      return (
        student.firstName?.includes(searchField) ||
        student.lastName?.includes(searchField) ||
        student.studentIdNumber?.includes(searchField)
      );
    });
  }

  return (
    <section className="flex flex-col basis-3/4 w-full items-center justify-between">
      <StudentCardList studentSearchResult={studentSearchResults} />
    </section>
  );
}