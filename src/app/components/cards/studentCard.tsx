import { StudentInfo } from "@/app/types/formTypes";

type StudentCardProps = {
  student: StudentInfo;
};

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <>
      <div className="flex flex-row justify-evenly bg-white w-3/4 rounded-lg m-4 basis-1/3">
        <div className="flex flex-row w-full items-center justify-evenly">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              {student.firstName} {student.lastName}
            </h1>
            <p>
              <strong>Student Id : </strong>
              {student.studentIdNumber}
            </p>
          </div>
          {student.instrument ? (
            <div className="flex flex-col">
              <p>
                <strong>Type: </strong>
                {student.instrument?.classification}
              </p>
              <p>
                <strong>Brand: </strong>
                {student.instrument?.brand}
              </p>
              <p>
                <strong>Serial Number: </strong>
                {student.instrument.serialNumber}
              </p>
            </div>
          ) : (
            "No instrument assigned"
          )}
        </div>
      </div>
    </>
  );
}
