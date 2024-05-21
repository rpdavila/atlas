"use client";
// react imports
import { useEffect } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import { StudentInfo, StudentList } from "@/app/types/formTypes";
import Loading from "@/app/components/loading/loading";


export default function SearchStudent() {
  const dispatch = useAppDispatch();

  // Grab student list in store
  const displayStudents: StudentList = useAppSelector(
    (state: RootState) => state.students.studentList
  );
  // Grab instrument list in store
  const loading: boolean = useAppSelector(
    (state: RootState) => state.students.loading
  );

  //grab search options type in store
  const searchOptions: string = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );
  // grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );


  const studentSearchResults: StudentList = displayStudents.filter((student: StudentInfo) => {
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
    console.log(displayStudents)

  }, [dispatch, displayStudents, searchOptions])
  return (
    <section className="flex flex-col basis-3/4 items-center">
      {loading ? <Loading /> : <StudentCardList studentSearchResult={studentSearchResults} />}

    </section>
  );
}
