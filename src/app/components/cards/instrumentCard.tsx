"use client";
import { useEffect } from "react";

//component imports
import Button from "../button/button";
import { Select, SelectItem } from "@heroui/react";
// server actions
import { assignStudentToInstrument, getDropDownList, unassignStudentFromInstrument } from "@/actions/actions";
// auth
import { useSession } from "next-auth/react";
//redux 
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";

//type 
import { RentStatus } from "@prisma/client";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  school: {
    id: string;
    districtId: string | null;
    profileId: string | null;
    name: string;
  } | null;
} | undefined

type StudentList = Student[]

type Instrument = {
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
  instrumentAssignment: {
    id: string;
    student: {
      id: string;
      firstName: string;
      lastName: string;
      studentIdNumber: string;
    };
  } | null;
  school: {
    name: string;
  };
} | undefined


type CardProps = {
  instrument: Instrument;
  studentDropDownList: StudentList,
};

export default function InstrumentCard({ instrument, studentDropDownList }: CardProps) {
  const session = useSession()
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const students = await getDropDownList(session.data?.user?.id as string)
      dispatch(setDropDownList(students))
    }
    fetchData()
  }, [dispatch, session.data?.user?.id])
  return (
    <section className="flex flex-col items-center w-full m-2 bg-white sm:flex-row sm:w-full rounded-lg mb-4">
      <div className="flex flex-col items-start sm:w-1/3 m-6 justify-center ">
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
        <p>
          <strong>School: </strong>
          {instrument?.school?.name}
        </p>
      </div>
      {instrument?.instrumentAssignment ? (
        <div className="flex flex-col items-start justify-center m-6">
          <strong>
            <h1>Assigned to: </h1>
          </strong>
          <p>
            <strong>First Name:</strong>
            {instrument.instrumentAssignment.student.firstName}
          </p>
          <p>
            <strong>Last Name: </strong>
            {instrument.instrumentAssignment.student.lastName}
          </p>
          <p>
            <strong>Student Id Number: </strong>
            {instrument.instrumentAssignment.student.studentIdNumber}
          </p>
          <form action={async () => {
            await unassignStudentFromInstrument(instrument.id, instrument.instrumentAssignment?.student.id as string)
            const students = await getDropDownList(session.data?.user?.id as string)
            dispatch(setDropDownList(students))
          }}>
            <Button type="submit" name="Unassign Student" marginTop="0" />
          </form>
        </div>

      ) : (
        <section className="flex bassis-1/2">
          <form
            className="w-full"
            action={async (formData: FormData) => {
              await assignStudentToInstrument(formData, instrument?.id as string)
              const students = await getDropDownList(session.data?.user?.id as string)
              dispatch(setDropDownList(students))
            }}
          >
            <Select
              name="student"
              label="Assign Student"
              placeholder="Assign Student"
              className="max-w-lg"
            >
              {studentDropDownList.map((student) => {
                return (
                  <SelectItem
                    key={student?.id as string}
                    textValue={`${student?.firstName} ${student?.lastName}`}
                  >
                    {student?.firstName} {student?.lastName}
                  </SelectItem>
                );
              })}
            </Select>
            <Button type="submit" name="Assign Student" />
          </form>
        </section>
      )}
    </section>
  );
}
