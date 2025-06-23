"use client";
import { Select, SelectItem } from "@heroui/react";
import { getDropDownList } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { RentStatus } from "@/app/types/formTypes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";


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

type ComponentProps = {
  studentDropDownList: StudentList,
}
export default function StudentDropDownList({ studentDropDownList }: ComponentProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const [student, setStudent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const students = await getDropDownList(session.data?.user?.id as string)
      dispatch(setDropDownList(students))
    }
    fetchData()
  }, [dispatch, session.data?.user?.id])
  return (

    <Select
      name="student"
      label="Assign Student"
      placeholder="Assign Student"
      className="max-w-lg"
    >
      {studentDropDownList.map((student) => {
        return (
          <SelectItem
            onClick={() => setStudent(student?.id as string)}
            key={student?.id as string}
            textValue={`${student?.firstName} ${student?.lastName}`}
          >
            {student?.firstName} {student?.lastName}
          </SelectItem>
        );
      })}
    </Select>
  )
}