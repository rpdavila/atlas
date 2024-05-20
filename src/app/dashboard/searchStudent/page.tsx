"use client";
// react imports
import { useEffect } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";

//component imports
import StudentCardListSuspenseWrapper from "../../components/card-list/studentCardList";
import { StudentInfo, StudentList } from "@/app/types/formTypes";


export default function SearchStudent() {
  const dispatch = useAppDispatch();

  // Grab student list in store
  const displayStudents: StudentList = useAppSelector(
    (state: RootState) => state.students.studentList
  );
  // Grab instrument list in store


  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );


  const studentSearchResults = displayStudents?.filter((student: StudentInfo) => {
    return (
      student.firstName?.includes(searchField) ||
      student.lastName?.includes(searchField) ||
      student.studentIdNumber?.includes(searchField)
    );
  });

  useEffect(() => {
    if (typeof displayStudents === "undefined" || displayStudents.length === 0) {
      dispatch(getStudents())
    }

  }, [dispatch, displayStudents])
  return (
    <section className="flex flex-col basis-3/4 items-center">
      <StudentCardListSuspenseWrapper studentSearchResult={studentSearchResults} />
    </section>
  );
}
