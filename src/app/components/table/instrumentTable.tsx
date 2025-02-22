"use client";
// react imports
import { useState } from "react";
// type imports
import { getTeacherEmailByInstument } from "@/actions/actions";
import { RentStatus } from "@prisma/client";
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
//auth
import { useSession } from "next-auth/react";

//ui imports
import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react"


type DistrictInstrument = {
  school: {
    name: string;
  };
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
} | undefined

type DistrictInstruments = Array<DistrictInstrument>

const columns = [
  {
    key: "classifiaction",
    label: "Classification"
  },
  {
    key: "brand",
    label: "Brand"
  },
  {
    key: "SerialNumber",
    label: "Serial Number"
  },
  {
    key: "school",
    label: "School"
  }
]

export default function DistrictTable({
  districtInstrumentSearchResults
}: {
  districtInstrumentSearchResults: DistrictInstruments
}) {
  const session = useSession()
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const excludeSchools = useAppSelector(state => state.userInfo.schools).map((school: { name: string; }) => school.name)
  const filteredSchools = districtInstrumentSearchResults.filter(school =>
    !excludeSchools.includes(school?.school.name as string)
  )

  const handleClick = async (
    school: string,
    instrumentId: string,
    instrumentType: string,
    instrumentSerialNumber: string
  ) => {
    try {
      const teacherData = await getTeacherEmailByInstument(instrumentId, school)
      if (!teacherData || !teacherData.teacherEmail) {
        console.error("Teacher email not found")
        return
      }

      const { teacherName, teacherEmail } = teacherData;

      const sendingTeacherEmail = session.data?.user?.email
      const sendingTeacherName = session.data?.user?.name

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sendingTeacherName: sendingTeacherName,
          sendingTeacherEmail: sendingTeacherEmail,
          recievingTeacherName: teacherName,
          instrumentType: instrumentType,
          instrumentSerialNumber: instrumentSerialNumber,
          receivingTeacherEmail: teacherEmail
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setEmailSent(true)
        setTimeout(() => {
          setEmailSent(false)
        }, 3000)
      } else {
        console.error('Error sending email:', result.error);
      }
    } catch (error) {
      console.log('Failed To sendEmail', error)
    }
  }

  return (
    <>
      {emailSent && <p className="text-white text-center bg-green-800">Email Sent</p>}
      <Table
        aria-label="District Instruments Table"
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody >
          {filteredSchools.map((item) => (
            <TableRow
              className="hover:cursor-pointer hover:bg-slate-400 rounded-lg"
              key={`${item?.id}-${item?.serialNumber}`}
            // onClick={() => handleClick(item?.school?.name as string, item?.id as string, item?.classification as string, item?.serialNumber as string)}
            >
              <TableCell>{item?.classification}</TableCell>
              <TableCell>{item?.brand}</TableCell>
              <TableCell>{item?.serialNumber}</TableCell>
              <TableCell>{item?.school?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}