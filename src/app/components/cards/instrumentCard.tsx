"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { addStudentToInstrument, getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";
import { InstrumentDetails, OnlyStudentData, OnlyStudentId, StudentInfo } from "@/app/types/formTypes";
import Select from "../input/customSelection";
import { assignInstrumentToStudent, filterStudentList, getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";

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

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const value = event.target.value.split(" ");
    // get a matching student
    const matchingStudent = displayStudents.find((student) => {
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

    
    // dispatch and add the student to instrument collection
    await dispatch(
      addStudentToInstrument({
        serialNumber: matchingInstrument?.serialNumber,
        student: {
          firstName: matchingStudent?.firstName,
          lastName: matchingStudent?.lastName,
          studentIdNumber: matchingStudent?.studentIdNumber
        }
      })
    );

    // dispatch and add instrument to the student collection
    await dispatch(
      assignInstrumentToStudent({
        studentIdNumber: matchingStudent?.studentIdNumber,
        instrument: {
          classification: matchingInstrument?.classification,
          brand: matchingInstrument?.brand,
          serialNumber: matchingInstrument?.serialNumber,          
          }
        }
      )
    )
    // get updated instrument list
    await dispatch(getInstruments())
    // get updated student list
    await dispatch(getStudents())
    // get update dropDownList
    await dispatch(getDropDownList())   
  
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
            <h1>Assigned to: </h1>
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
