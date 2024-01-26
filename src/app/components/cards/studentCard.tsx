import { StudentInfo } from "@/app/types/formTypes";

type StudentCardProps = {
  student: StudentInfo;
};

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <>
      <div className="flex flex-row justify-evenly bg-white w-3/4 rounded-lg m-4 basis-1/3">
        <div className="flex flex-col w-1/3 items-center justify-center">
          <h1 className="text-2xl font-bold">
            {student.firstName} {student.lastName}
          </h1>
          <p>
            <strong>Student Id : </strong>
            {student.studentIdNumber}
          </p>
          {student.instrument ? (
            <div>
              <p>
                <strong>Type: </strong>
                {student.instrument?.type}
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
