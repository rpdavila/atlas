"use client"

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { useMongoDbDataAccess } from "@/app/hooks/useMongoDbDataAccess";

//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import { StudentInfo, StudentList } from "@/app/types/formTypes";
import Loading from "../loading/loading";

export default function SearchStudent() {
  let studentSearchResults: StudentList = [];
  //const dispatch = useAppDispatch();
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

  if (data) {
    studentSearchResults = data.filter((student: StudentInfo) => {
      return (
        student.firstName?.includes(searchField) ||
        student.lastName?.includes(searchField) ||
        student.studentIdNumber?.includes(searchField)
      );
    });
  }

  if (error) {
    return (
      <>
        <h1>Error: {error.message}</h1>
      </>
    );
  }

  return (
    <section className="flex flex-col basis-3/4 w-full items-center justify-between">
      {loading ? <Loading/> : <StudentCardList studentSearchResult={studentSearchResults} />}
    </section>
  );
}