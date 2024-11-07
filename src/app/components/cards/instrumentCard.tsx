import { useEffect } from "react";
// type imports
import { InstrumentWithoutUserId, StudentListWithoutUserIdAndInstrument } from "@/app/types/formTypes";
//component imports
import Button from "../button/button";
import { Select, SelectItem } from "@nextui-org/react";
// server actions
import { assignStudentToInstrument, getDropDownList, unassignStudentFromInstrument } from "@/actions/actions";
// auth
import { useSession } from "next-auth/react";
//redux 
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";
type CardProps = {
  instrument: InstrumentWithoutUserId;
  studentDropDownList: StudentListWithoutUserIdAndInstrument,
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
  },[dispatch, session.data?.user?.id])
  return (
    <section className="flex flex-col items-center w-full justify-evenly m-2 bg-white sm:flex-row sm:w-full rounded-lg">
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
        <p>
          <strong>School: </strong>
          {instrument?.school?.name}
        </p>
      </div>
      {instrument.assignedTo ? (
        <div className="flex flex-col items-start justify-center m-6">
          <strong>
            <h1>Assigned to: </h1>

          </strong>
          <p>
            <strong>First Name:</strong>
            {instrument.assignedTo?.firstName}
          </p>
          <p>
            <strong>Last Name: </strong>
            {instrument.assignedTo?.lastName}
          </p>
          <p>
            <strong>Student Id Number: </strong>
            {instrument.assignedTo?.studentIdNumber}
          </p>
          <form action={async () => {
            await unassignStudentFromInstrument(session.data?.user?.id as string, instrument.id)
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
              await assignStudentToInstrument(formData, instrument.id)
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
                    key={student.id}
                    textValue={`${student.firstName} ${student.lastName}`}
                  >
                    {student.firstName} {student.lastName}
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
