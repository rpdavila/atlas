
import { Table, TableBody, TableRow, TableCell, TableColumn, TableHeader } from "@heroui/react";

import { useAppSelector } from "@/lib/ReduxSSR/hooks";

import { useRouter } from "next/navigation";

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
  }
]
export default function StudentCardList({
  studentSearchResult
}: CardListProps) {
  //const router = useRouter();
  const schoolName = useAppSelector(state => state.searchOptions.school)
  const filterStudentsBySchool = studentSearchResult.filter(student => student.school?.name === schoolName)

  //TODO: handle student profile
  const handleStudent = (id: string,) => {
    //redirect to student profile
  }
  return (
    <Table
      aria-label="Students"
      className="h-full">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {filterStudentsBySchool.map((items: Student) => (
          <TableRow
            className="hover:cursor-pointer hover:bg-slate-400 rounded-lg"
            key={items.id}
            onClick={() => handleStudent(items.id)}
          >
            <TableCell>{items.firstName} {items.lastName}</TableCell>
            <TableCell>{items.studentIdNumber}</TableCell>
            <TableCell>{items.school?.name}</TableCell>
            <TableCell>{items.instrumentAssignment ? items.instrumentAssignment.instrument.classification : `${null}`}</TableCell>
            <TableCell>{items.instrumentAssignment ? items.instrumentAssignment.instrument.school.name : `${null}`}</TableCell>
            <TableCell>{items.instrumentAssignment ? items.instrumentAssignment.instrument.serialNumber : `${null}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
}
