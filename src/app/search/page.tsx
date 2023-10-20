"use client";

import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
export default function Search() {
  const searchStudents = useAppSelector(
    (state: RootState) => state.students.studentList
  );

  const selectStudentInfo = useAppSelector(
    (state: RootState) => state.students.studentInfo
  );

  const displayInstruments = useAppSelector(
    (state: RootState) => state.instruments.instrumentList
  );

  const checkIfSearchStudentIsChecked = useAppSelector(
    (state: RootState) => state.searchOptions.searchStudent
  );

  const checkIfSearchInstrumentIsChecked = useAppSelector(
    (state: RootState) => state.searchOptions.searchInstrument
  );

  return (
    <main className="flex min-h-screen justify-center items-center flex-col basis-3/4 mt-2 rounded-lg">
      {checkIfSearchStudentIsChecked &&
        searchStudents.map((student) => {
          
          return (
            <div
              key={student.id}
              className="flex-col max-w-5xl w-1/2 items-center font-mono lg:flex bg-white mt-4 rounded-lg"
            >
              <p>FirstName: {student.firstName}</p>
              <p>LastName: {student.lastName}</p>
              <p>Student Id Number: {student.studentIdNumber}</p>
            </div>
          );
        })}
      {checkIfSearchInstrumentIsChecked &&
        displayInstruments.map((instrument) => {
          return (
            <div
              key={instrument.id}
              className="flex-col max-w-5xl w-1/2 items-center font-mono lg:flex bg-white mt-4 rounded-lg"
            >
              <p>Type: {instrument.type}</p>
              <p>Brand: {instrument.brand}</p>
              <p>Serial Number: {instrument.serialNumber}</p>
            </div>
          );
        })}
    </main>
  );
}
