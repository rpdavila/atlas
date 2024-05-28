"use client"
// react imports
import { useEffect, useState } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { useMongoDbDataAccess } from "@/app/hooks/useMongoDbDataAccess";

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import { StudentInfo, StudentList } from "@/app/types/formTypes";

export default function SearchStudent() {
  let studentSearchResults: StudentList = [];
  const [jump, setJump] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useMongoDbDataAccess({ collectionName: 'studentInfo' });
  // Grab student list in store
  // const displayStudents: StudentList = useAppSelector(
  //   (state: RootState) => state.students.studentList
  // );
  // check if students are loading
  // const studentsLoading = useAppSelector(state => state.students.loading);
  // // grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );
  // used to refresh component when search option changes
  const searchOption: string = useAppSelector(state => state.searchOptions.type)

  if (data) {
    studentSearchResults = data.filter((student: StudentInfo) => {
      return (
        student.firstName?.includes(searchField) ||
        student.lastName?.includes(searchField) ||
        student.studentIdNumber?.includes(searchField)
      );
    });
  }



  return (
    <section className="flex flex-col basis-3/4 w-full items-center justify-between">
      {loading ? <h1>Loading...</h1> : <StudentCardList studentSearchResult={studentSearchResults} />}
    </section>
  );
}