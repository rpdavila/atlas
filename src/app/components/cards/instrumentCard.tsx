"use client";
//component imports
import Button from "../button/button";
import FormWrapper from "../notification/formWrapper";
// server actions
import { removeInstrument } from "@/actions/actions";
//hooks
import { useInstrumentAssignmentAction } from "@/lib/hooks/useInstrumentAssignmentAction";
import { Card, CardBody } from "@heroui/react";

//type
import { RentStatus } from "@prisma/client";

import StudentDropDownList from "../studentDropDownList/studentDropDownList";

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
  const { handleAssignmentAction, isPending } = useInstrumentAssignmentAction();

  return (
    <>
      <Card 
        className="w-full shadow-md hover:shadow-lg transition-shadow bg-slate-100 border border-slate-600"
        data-cy="instrument-card"
        >
        <CardBody className="p-4">
          <div className="space-y-3">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-slate-600">
                {instrument?.classification}
              </h3>
            </div>

            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-600">Brand:</dt>
                <dd className="text-sm text-slate-600">{instrument?.brand}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-600">Serial Number:</dt>
                <dd className="text-sm text-slate-600 font-mono">{instrument?.serialNumber}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-600">Status:</dt>
                <dd className="text-sm text-slate-600">{instrument?.rentStatus}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm font-medium text-slate-600">School:</dt>
                <dd className="text-sm text-slate-600">{instrument?.school?.name}</dd>
              </div>
            </dl>

            <div className="pt-3 border-t">
              {instrument?.rentStatus === "Rented" ? (
                <form action={handleAssignmentAction}>
                  <input type="hidden" name="instrumentId" value={instrument?.id} />
                  <input type="hidden" name="rentStatus" value={instrument?.rentStatus} />
                  <input type="hidden" name="studentId" value={instrument?.instrumentAssignment?.student.id} />
                  <Button name={`Unassign ${instrument.instrumentAssignment?.student.firstName} ${instrument.instrumentAssignment?.student.lastName}`} type="submit" danger={true} isPending={isPending} />
                </form>
              ) : (
                <form action={handleAssignmentAction} className="space-y-3">
                  <input type="hidden" name="instrumentId" value={instrument?.id} />
                  <input type="hidden" name="rentStatus" value="Available" />
                  <StudentDropDownList studentDropDownList={studentDropDownList} />
                  <Button name="Assign" type="submit" isPending={isPending} />
                </form>
              )}
            </div>
            <div className="pt-3 border-t">
              <FormWrapper
                action={async (formData: FormData) => removeInstrument(formData)}
                submitButton={{
                name: "Remove Instrument",
                danger: true,
                pendingName: "Removing Student",
                type: "submit"
                }}
              >
                <input name="instrumentId" type="hidden" value={instrument?.id}/>
              </FormWrapper>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
