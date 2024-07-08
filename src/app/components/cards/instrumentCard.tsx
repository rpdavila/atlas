"use client";

//redux imports
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { addStudentToInstrument, getInstruments, unassignStudentFromInstrument } from "@/lib/ReduxSSR/features/instrumentSLice";
import { assignInstrumentToStudent, getDropDownList, getStudents, unassignInstrumentFromStudent } from "@/lib/ReduxSSR/features/studentListSlice";

// type imports
import { InstrumentDetails, StudentInfo } from "@/app/types/formTypes";
//component imports
import Select from "../input/customSelection";
import Button from "../button/button";

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
    const matchingStudent = displayStudents.find((student: StudentInfo) => {
      if (student.firstName === value[0] && student.lastName === value[1]) {
        return student
      }
    });

    //get a matching instrument
    const matchingInstrument = displayInstruments.find((item: InstrumentDetails) => {
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
      })
    );

    // get updated instrument list
    await dispatch(getInstruments())

    // get updated student list
    await dispatch(getStudents())

    // update the dropDownList
    await dispatch(getDropDownList())
  };

  const handleUnassignStudent = async (instrumentSerialNumber: string | undefined, studentIdNumber: string | undefined) => {

    await dispatch(unassignStudentFromInstrument(instrumentSerialNumber))
    await dispatch(unassignInstrumentFromStudent(studentIdNumber))
    await dispatch(getInstruments())
    await dispatch(getStudents())
    await dispatch(getDropDownList())

  }
  return (
    <div className="flex flex-col items-center lg:flex-row md:flex-row sm:flex-col justify-evenly sm:items-center bg-white w-3/4 rounded-lg m-4 basis-1/3">
      <div className="flex flex-col w-auto sm:w-1/3 justify-center items-start m-6 ">
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
        <div className="flex flex-col items-start justify-center m-6">
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
          <Button type="button" name="Unassign Student" marginTop="0" onClick={() => handleUnassignStudent(instrument.serialNumber, instrument.assignedTo?.studentIdNumber)} />
        </div>

      ) : (
        <Select
          category="Available Students"
          options={displayStudents}
          onChange={handleSelect}
          placeHolder="Assign Student"
        />
      )}
    </div>
  );
}
