"use client";
//react imports
import { useState, useActionState, useTransition } from "react";
//auth imports
import { useSession } from "next-auth/react";
//type imports
import { RentStatus } from "@prisma/client";

//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
import { form, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import Button from "../button/button"

// redux
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setDropDownList, studentListSlice } from "@/lib/ReduxSSR/features/studentListSlice";

//server actions
import { getDropDownList, unassignStudentFromInstrument } from "@/actions/actions";
import { assignStudentToInstrument } from "@/actions/actions";
import { toast } from "react-hot-toast";

type Student = {
  id: string;
  rented: boolean;
}

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

type InstrumentList = Instrument[];

type InstrumentCardListProps = {
  instrumentSearchResults: InstrumentList;
}

type InstrumentState = {
  instrumentId: string;
  rentStatus: RentStatus;
  studentId: string
}
export default function InstrumentCardList({
  instrumentSearchResults

}: InstrumentCardListProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const dropDownList = useAppSelector(state => state.students.dropDownList) ?? []
  const schoolName = useAppSelector(state => state.searchOptions.school) ?? []
  const columns = [
    { key: "classification", label: "Instrument Type" },
    { key: "brand", label: "Brand" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "rentStatus", label: "Status" },
    { key: "school", label: "School" },
    { key: "student", label: "Assign Student" },
    { key: "actions", label: "Actions" }
  ]

  // filter the data based on parameters
  const filteredSChools = instrumentSearchResults.filter(school => school?.school.name === schoolName)
  const filteredDropDownList = dropDownList.filter(student => student?.school?.name === schoolName)
  const [isPending, startTransition] = useTransition()

  const [instrument, setInstrument] = useState({
    instrumentId: "",
    rentStatus: "Available" as RentStatus,
    studentId: ""
  });

  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await handelAssignandUnassignInstrument(formData)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }, null)

  const handelAssignandUnassignInstrument = async (formData: FormData) => {
    try {
      if (instrument.rentStatus === "Rented") {
        const response = await unassignStudentFromInstrument(instrument.instrumentId, instrument.studentId);
        const updatedDropDownList = await getDropDownList(session.data?.user?.id as string);
        // Update the dropdown list
        dispatch(setDropDownList(updatedDropDownList));
        return { success: response.success, message: response?.message }

      } else {
        // Assign student to instrument          
        const response = await assignStudentToInstrument(formData, instrument.instrumentId);
        // Update the dropdown list
        const updatedDropDownList = await getDropDownList(session.data?.user?.id as string);
        dispatch(setDropDownList(updatedDropDownList));
        return { success: response.success, message: response.message }
      }
    } catch (error) {
      console.error("Error assigning or unassigning instrument:", error);
      return { success: false, message: "Error processing request" };
    }
  }


  // Use table view for larger screens, card view for mobile
  return (
    <section className="h-full w-full">
      {/* Table view for larger screens */}
      <form
        className="hidden md:flex justify-center"
        action={(formData) => {
          startTransition(() => formAction(formData))
        }}
      >
        <Table aria-label="Instruments" className="w-full">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            {filteredSChools.map((item: Instrument) => (
              <TableRow key={item?.id} className="hover:bg-slate-100" onClick={() => setInstrument({ instrumentId: item?.id as string, rentStatus: item?.rentStatus as RentStatus, studentId: item?.instrumentAssignment?.student.id as string })}>
                <TableCell>{item?.classification}</TableCell>
                <TableCell>{item?.brand}</TableCell>
                <TableCell>{item?.serialNumber}</TableCell>
                <TableCell>{item?.rentStatus}</TableCell>
                <TableCell>{item?.school?.name}</TableCell>
                <TableCell>
                  {item?.rentStatus === "Rented" ? `${item?.instrumentAssignment?.student.firstName} ${item?.instrumentAssignment?.student.lastName}` :
                    <Select
                      name={"student"}
                      aria-label="Assign Student"
                      placeholder="Assign Student"
                      className="max-w-lg"
                    >
                      {filteredDropDownList.map((student) => {
                        return (
                          <SelectItem
                            key={student?.id as string}
                            textValue={`${student?.firstName} ${student?.lastName}`}
                          >
                            {student?.firstName} {student?.lastName}
                          </SelectItem>
                        );
                      })}
                    </Select>
                  }
                </TableCell>
                <TableCell>
                  {item?.rentStatus === "Rented"
                    ? <Button name="Unassign Student" pendingName="Unassigning Student" type="submit" danger={true} isPending={isPending} />
                    : <Button name="Assign Student" pendingName="Assigning Student" type="submit" isPending={isPending} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>

      {/* Card view for mobile */}
      <div className="md:hidden">
        {filteredSChools.map((items: Instrument) => (
          <InstrumentCard
            key={items?.id}
            instrument={items}
            studentDropDownList={filteredDropDownList}
          />
        ))}
      </div>
    </section>
  )
}