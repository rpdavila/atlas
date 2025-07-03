import { Card, CardBody } from "@heroui/react";
import { RentStatus } from "@/app/types/formTypes";

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
    <Card className="w-full md:hidden shadow-md hover:shadow-lg transition-shadow">
      <CardBody className="p-4">
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {student.firstName} {student.lastName}
            </h3>
          </div>

          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-600">School:</dt>
              <dd className="text-sm text-gray-900">{student.school?.name || "N/A"}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-600">Instrument:</dt>
              <dd className="text-sm text-gray-900">{instrument?.classification || "Not Assigned"}</dd>
            </div>

            {instrument && (
              <>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">Instrument School:</dt>
                  <dd className="text-sm text-gray-900">{instrument.school.name}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">Serial Number:</dt>
                  <dd className="text-sm text-gray-900 font-mono">{instrument.serialNumber}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </CardBody>
    </Card>
  );
}
