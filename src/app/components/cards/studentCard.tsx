import { Table, TableBody, TableRow, TableCell, TableColumn, TableHeader } from "@nextui-org/react";
import { StudentWithoutUserId } from "@/app/types/formTypes";
import Button from "../button/button";

type StudentCardProps = {
  student: StudentWithoutUserId;
};
const columns = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "studentIdNumber",
    label: "Student Id Number"
  },
  {
    key: "school",
    label: "School"
  },
  {
    key: "instrument",
    label: "Instrument"
  },
]
export default async function StudentCard({ student }: StudentCardProps) {

  return (
    <>
      {student.instrument ? (
        <>
          <section className="flex flex-row justify-center border-cyan-600 border-b-small">
            <p >
              <strong>Type: </strong>
              {student.instrument.classification}
            </p>
          </section>
          <section className="flex justify-center border-cyan-600 border-b-small">
            <p>
              <strong>Brand: </strong>
              {student.instrument.brand}
            </p>
          </section>
          <section className="flex justify-center col-span-2">
            <p>
              <strong>Serial Number: </strong>
              {student.instrument.serialNumber}
            </p>
          </section>
        </>

      ) : (
        <div className="flex justify-center col-span-2 row-span-2 p-1">
          <form action={async () => {

          }}>
            <Button type="submit" name="Assign Student" />
          </form>
        </div>
      )}

    </>
  );
}
