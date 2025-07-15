import { Card, CardBody } from "@heroui/react";
import { RentStatus } from "@prisma/client";

type Student = {
  school: {
    name: string;
  } | null;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  id: string;
  instrumentAssignment: {
    instrument: {
      school: {
        name: string;
      };
      id: string;
      classification: string;
      brand: string;
      serialNumber: string;
      rentStatus: RentStatus;
    };
  } | null;
}



export default function StudentCard({ student }: { student: Student }) {
  const instrument = student.instrumentAssignment?.instrument;
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow bg-slate-100 border border-slate-600">
      <CardBody className="p-4">
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="text-lg font-semibold text-slate-600">
              {student.firstName} {student.lastName}
            </h3>
          </div>

          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-slate-600">School:</dt>
              <dd className="text-sm text-slate-600">{student.school?.name || "N/A"}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-sm font-medium text-slate-600">Instrument:</dt>
              <dd className="text-sm text-slate-600">{instrument?.classification || "Not Assigned"}</dd>
            </div>

            {instrument && (
              <>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-slate-600">Instrument School:</dt>
                  <dd className="text-sm text-slate-600">{instrument.school.name}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-slate-600">Serial Number:</dt>
                  <dd className="text-sm text-slate-600 font-mono">{instrument.serialNumber}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </CardBody>
    </Card>
  );
}
