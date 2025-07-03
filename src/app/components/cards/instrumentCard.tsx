"use client";
import { useActionState, useTransition } from "react";

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
import { Card, CardBody } from "@heroui/react";

//type 
import { RentStatus } from "@prisma/client";

// hot toast import
import { toast } from "react-hot-toast";

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
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const instrumentId = formData.get("instrumentId") as string;
    const studentId = formData.get("studentId") as string;
    const rentStatus = formData.get("rentStatus") as RentStatus;

    try {
      let response;
      if (rentStatus === "Rented") {
        response = await unassignStudentFromInstrument(instrumentId, studentId);
      } else {
        response = await assignStudentToInstrument(formData, instrumentId);
      }

      const updatedDropDownList = await getDropDownList(session.data?.user?.id as string)
      dispatch(setDropDownList(updatedDropDownList))

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error processing request")
    }
  }, null)

  const instrumentDetails = (
    <section className="flex flex-col items-start mb-4">
      <h1 className="text-2xl text-center w-full">{instrument?.classification}</h1>
      <p>Brand: {instrument?.brand}</p>
      <p>SN: {instrument?.serialNumber}</p>
      <p>RentStatus: {instrument?.rentStatus}</p>
    </section>
  );
  return (
    <>
      <Card>
        <CardBody>
          {instrument?.rentStatus === "Rented"
            ? (
              <form
                action={(formData: FormData) => startTransition(() => formAction(formData))}>
                <input type="hidden" name="instrumentId" value={instrument?.id} />
                <input type="hidden" name="rentStatus" value={instrument?.rentStatus} />
                <input type="hidden" name="studentId" value={instrument?.instrumentAssignment?.student.id} />
                {instrumentDetails}
                <Button name={`Unassign ${instrument.instrumentAssignment?.student.firstName} ${instrument.instrumentAssignment?.student.lastName}`} type="submit" danger={true} isPending={isPending} />
              </form>
            )
            : (
              <form
                action={(formData: FormData) => startTransition(() => formAction(formData))}>
                <input type="hidden" name="instrumentId" value={instrument?.id} />
                <input type="hidden" name="rentStatus" value="Available" />
                {instrumentDetails}
                <Select name="student" placeholder="Select Student" isRequired className="min-w-48">
                  {studentDropDownList.map((student) => (
                    <SelectItem
                      key={student?.id}
                      textValue={`${student?.firstName} ${student?.lastName}`}
                    >
                      {student?.firstName} {student?.lastName}
                    </SelectItem>
                  ))}
                </Select>
                <Button name="Assign" type="submit" isPending={isPending} />
              </form>
            )}
        </CardBody>
      </Card>
    </>
  )
}
