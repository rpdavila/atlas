"use client";
// react imports
import { useState } from "react";
// type imports
import { getTeacherEmailByInstrument } from "@/actions/actions";
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
  Button,
  Spinner
} from "@heroui/react";
import {toast} from "react-hot-toast";


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
    key: "classification",
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
  },
  { 
    key: "Send Request",
    label: "Send Email Request"
  }
]

export default function DistrictTable({
  districtInstrumentSearchResults
}: {
  districtInstrumentSearchResults: DistrictInstruments
}) {
  const session = useSession()
  const [sendingEmail, setSendingEmail] = useState<boolean>(false)

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
      setSendingEmail(true)
      const teacherData = await getTeacherEmailByInstrument(instrumentId, school)
      if (!teacherData || !teacherData.teacherEmail) {
        console.error("Teacher email not found")
        return
      }

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
          receivingTeacherName: teacherData.teacherName,
          instrumentType: instrumentType,
          instrumentSerialNumber: instrumentSerialNumber,
          receivingTeacherEmail: teacherData.teacherEmail
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSendingEmail(false)
        toast.success('Email sent successfully!');
      } else {
        setSendingEmail(false)
        console.error("Full error:", result)
        toast.error(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      setSendingEmail(false)
      toast.error('Failed to send email');
    } finally {
      setSendingEmail(false)
    }
  }

  return (
    <>
      <Table
        aria-label="District Instruments Table"
        className="hidden sm:table"
      >
        <TableHeader
          columns={columns}
          className="bg-slate-700 text-white font-semibold text-sm"
        >
          {(column) =>
            <TableColumn
              key={column.key}
            >
              {column.label}
            </TableColumn>}
        </TableHeader>
        <TableBody
          className="bg-slate-700">
          {filteredSchools.map((item) => (
            <TableRow
              key={`${item?.id}-${item?.serialNumber}`}              
            >
              <TableCell>{item?.classification}</TableCell>
              <TableCell>{item?.brand}</TableCell>
              <TableCell>{item?.serialNumber}</TableCell>
              <TableCell>{item?.school?.name}</TableCell>
              <TableCell>             
                <Button
                  type="button"
                  name="request"
                  isDisabled={sendingEmail}
                  isLoading={sendingEmail}
                  spinner={<Spinner size="sm" color="white"  />} 
                  spinnerPlacement="start"
                  color={sendingEmail ? "danger" : "primary"}
                  onPress={
                    () => handleClick(
                      item?.school?.name as string, 
                      item?.id as string, 
                      item?.classification as string, 
                      item?.serialNumber as string
                    )}                
                >
                  {sendingEmail ? 'Sending...' : 'Send Request'}
                </Button>                                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}