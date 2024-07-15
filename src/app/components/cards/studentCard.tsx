import { StudentInfo } from "@/app/types/formTypes";

type StudentCardProps = {
  student: StudentInfo;
};

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <>
      <div className="container grid grid-cols-2 grid-rows-4 justify-center items-center bg-white rounded-lg">
        <div className="flex justify-center col-span-2 border-cyan-600 border-b-small">
          <h1 className="text-2xl font-bold">
            {student.firstName} {student.lastName}
          </h1>
        </div>
        <div className="flex justify-center col-span-2 border-cyan-600 border-b-small">
          <p>
            <strong>Student Id: </strong>
            {student.studentIdNumber}
          </p>
        </div>
        {student.instrument ? (
          <>
            <section className="flex flex-row justify-center border-cyan-600 border-b-small">
              <p >
                <strong>Type: </strong>
                {student.instrument?.classification}
              </p>
            </section>
            <section className="flex justify-center border-cyan-600 border-b-small">
              <p>
                <strong>Brand: </strong>
                {student.instrument?.brand}
              </p>
            </section>
            <section className="flex justify-center col-span-2">
              <p >
                <strong>Serial Number: </strong>
                {student.instrument.serialNumber}
              </p>
            </section>
          </>

        ) : (
          <div className="flex justify-center col-span-2 row-span-2">
            <span>No instrument assigned</span>
          </div>
        )}
      </div>
    </>
  );
}
