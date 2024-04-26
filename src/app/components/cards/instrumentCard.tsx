"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { addStudentToInstrument } from "@/app/redux/features/instrumentSLice";
import { InstrumentDetails, OnlyStudentData, StudentInfo } from "@/app/types/formTypes";
import Select from "../input/customSelection";
import { filterStudentList } from "@/app/redux/features/studentListSlice";

type CardProps = {
  instrument: InstrumentDetails;
};

export default function InstrumentCard({ instrument }: CardProps) {
  const dispatch = useAppDispatch();
  const displayInstruments = useAppSelector(
    (state) => state.instruments.instrumentList
  );
  const displayStudents = useAppSelector(
    (state) => state.students.dropDownList
  );


  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    // MUST BE MODIFIED TO USE DB INSTANCE. IT IS CURRENTLY USING DUMMY DATA PROVIDED IN THE DATA FOLDER
    const value = event.target.value.split(" ");
    // get a matching student
    const matchingStudent = displayStudents.find((student: StudentInfo) => {
      if (student.firstName === value[0] && student.lastName === value[1]) {
        return student
      }
    });

    //get a matching instrument
    const matchingInstrument = displayInstruments.find((item) => {
      if (item._id === instrument._id) {
        return item;
      }
    });

    
    // dispatch and add the student to instrument
    dispatch(
      addStudentToInstrument({
        _id: matchingInstrument?._id,
        student: {
          firstName: matchingStudent?.firstName,
          lastName: matchingStudent?.lastName,
          studentIdNumber: matchingStudent?.studentIdNumber
        }
      })
    );

    // filter students in the student list select option
    dispatch(
      filterStudentList({
        _id: matchingStudent?._id,
        firstName: matchingStudent?.firstName,
        lastName: matchingStudent?.lastName,
        studentIdNumber: matchingStudent?.studentIdNumber,
      })
    );

    // add instrument to student info
    // dispatch(
    //   assignInstrumentToStudent({
    //     studentInfo: {
    //       studentIdNumber: matchingStudent?.studentIdNumber,
    //     },
    //     instrumentInfo: {
    //       classification: matchingInstrument?.classification,
    //       brand: matchingInstrument?.brand,
    //       serialNumber: matchingInstrument?.serialNumber,
    //     },
    //   })
    // );
  };

  return (
    <div className="flex flex-row justify-evenly bg-white w-3/4 rounded-lg m-4 basis-1/3">
      <div className="flex flex-col w-1/3 items-start justify-center">
        <p>
          <strong>Instrument type: </strong>
          {instrument?.classification}
        </p>
        <p>
          <strong>Brand: </strong>
          {instrument?.brand}
        </p>
        <p>
          <strong>Serial Number: </strong>
          {instrument?.serialNumber}
        </p>
        <p>
          <strong>Rent Status: </strong>
          {instrument?.rentStatus}
        </p>
      </div>
      {instrument?.rentStatus === "Rented" ? (
        <div className="flex flex-col items-start justify-center">
          <strong>
            <h1>Assign to: </h1>
          </strong>
          <p>
            <strong>First Name:</strong>
            {instrument.assignedTo?.firstName}
          </p>
          <p>
            <strong>Last Name: </strong> {instrument.assignedTo?.lastName}
          </p>
          <p>
            <strong>Student Id Number: </strong>
            {instrument.assignedTo?.studentIdNumber}
          </p>
        </div>
      ) : (
        <Select
          category="Available Students"
          options={displayStudents}
          onChange={handleSelect}
          placeHolder="Assign to student"
        />
      )}
    </div>
  );
}
