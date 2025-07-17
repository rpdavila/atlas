
import { useMemo } from "react";
import { Table, TableBody, TableRow, TableCell, TableColumn, TableHeader } from "@heroui/react";
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RentStatus } from "@prisma/client";
import StudentCard from "../cards/studentCard";
import FormWrapper from "../notification/formWrapper";
import { removeStudentFromCourse } from "@/actions/actions";


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

type Students = Student[]
type CardListProps = {
  studentSearchResult: Students
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
  {
    key: "instrumentSchool",
    label: "Instrument School"
  },
  {
    key: "InstrumentSerialNumber",
    label: "Instrument Serial Number"
  },
  {
    key: "removeFromCourse",
    label: "Remove From Course"
  }
]
export default function StudentCardList({
  studentSearchResult
}: CardListProps) {
  const schoolName = useAppSelector(state => state.searchOptions.school)
  const filterStudentBySchool = useMemo(() => {
    return studentSearchResult.filter(student => student.school?.name === schoolName)
  }, [studentSearchResult, schoolName])

  return (
    <>
      <Table
        aria-label="Students"
        className="hidden md:block w-full">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          {filterStudentBySchool.map((item: Student) => (
            <TableRow
              className="hover:cursor-pointer hover:bg-slate-400 rounded-lg"
              key={item.id}
            >
              <TableCell>{item.firstName} {item.lastName}</TableCell>
              <TableCell>{item.studentIdNumber}</TableCell>
              <TableCell>{item.school?.name}</TableCell>
              <TableCell>{item.instrumentAssignment ? item.instrumentAssignment.instrument.classification : "Not Assigned"}</TableCell>
              <TableCell>{item.instrumentAssignment ? item.instrumentAssignment.instrument.school.name : "Not Assigned"}</TableCell>
              <TableCell>{item.instrumentAssignment ? item.instrumentAssignment.instrument.serialNumber : "Not Assigned"}</TableCell>
              <TableCell>
                <FormWrapper
                  action={(formData: FormData) => removeStudentFromCourse(formData)}
                  submitButton={{
                    name: "Remove Student",
                    type: "submit",
                    danger: true,
                    pendingName: "Removing Student"
                  }}
                >
                  <input type="hidden" name="studentId" value={item.id} />
                  <input type="hidden" name="instrumentId" value={item.instrumentAssignment ? item.instrumentAssignment.instrument.id : ""} />
                </FormWrapper>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >


      <div className="md:hidden w-full space-y-4">
        {filterStudentBySchool.map((student) => {
          return <StudentCard key={student.id} student={student} />
        })}
      </div>
    </>

  );
}
