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


  return (
    <>
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow bg-slate-800 border border-slate-600">
        <CardBody className="p-4">
          <div className="space-y-3">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-slate-100">
                {instrument?.classification}
              </h3>
            </div>

            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-300">Brand:</dt>
                <dd className="text-sm text-slate-100">{instrument?.brand}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-300">Serial Number:</dt>
                <dd className="text-sm text-slate-100 font-mono">{instrument?.serialNumber}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-300">Status:</dt>
                <dd className="text-sm text-slate-100">{instrument?.rentStatus}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-300">School:</dt>
                <dd className="text-sm text-slate-100">{instrument?.school?.name}</dd>
              </div>
            </dl>

            <div className="pt-3 border-t">
              {instrument?.rentStatus === "Rented" ? (
                <form action={(formData: FormData) => startTransition(() => formAction(formData))}>
                  <input type="hidden" name="instrumentId" value={instrument?.id} />
                  <input type="hidden" name="rentStatus" value={instrument?.rentStatus} />
                  <input type="hidden" name="studentId" value={instrument?.instrumentAssignment?.student.id} />
                  <Button name={`Unassign ${instrument.instrumentAssignment?.student.firstName} ${instrument.instrumentAssignment?.student.lastName}`} type="submit" danger={true} isPending={isPending} />
                </form>
              ) : (
                <form action={(formData: FormData) => startTransition(() => formAction(formData))} className="space-y-3">
                  <input type="hidden" name="instrumentId" value={instrument?.id} />
                  <input type="hidden" name="rentStatus" value="Available" />
                  <Select name="student" placeholder="Select Student" isRequired className="w-full">
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
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
