
import { Table, TableBody, TableRow, TableCell, TableColumn, TableHeader } from "@nextui-org/react";
import { StudentListWithoutUserId, StudentWithoutUserId } from "@/app/types/formTypes";
import Button from "../button/button";
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setSearch } from "@/lib/ReduxSSR/features/searchOptionsSlice";
import { useRouter } from "next/navigation";

type CardListProps = {
  studentSearchResult: StudentListWithoutUserId
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
  const router = useRouter();
  const schoolName = useAppSelector(state => state.searchOptions.school)
  const filterStudentsBySchool = studentSearchResult.filter(student => student.school?.name === schoolName)

  const handleStudent = (id: string,) => {
    router.push(`/dashboard/studentInfo/${id}`)
  }
  return (
    <Table
      aria-label="Students"
      className={`${filterStudentsBySchool.length > 8 ? "h-full" : "h-screen"} w-full`}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {filterStudentsBySchool.map((items: StudentWithoutUserId) => (
          <TableRow
            className="hover:cursor-pointer hover:bg-slate-400 rounded-lg"
            key={items.id}
            onClick={() => handleStudent(items.id)}
          >
            <TableCell>{items.firstName} {items.lastName}</TableCell>
            <TableCell>{items.studentIdNumber}</TableCell>
            <TableCell>{items.school?.name}</TableCell>
            <TableCell>{items.instrument ? items.instrument.classification : `${null}`}</TableCell>
            <TableCell>{items.instrument ? items.instrument?.school?.name : `${null}`}</TableCell>
            <TableCell>{items.instrument ? items.instrument?.serialNumber : `${null}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
}
