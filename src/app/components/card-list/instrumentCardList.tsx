"use client";
//react imports
import { useActionState, useTransition, useMemo } from "react";
//auth imports
import { useSession } from "next-auth/react";
//type imports
import { RentStatus } from "@prisma/client";

//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
import { Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import Button from "../button/button"

// redux
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";

//server actions
import { getDropDownList, unassignStudentFromInstrument } from "@/actions/actions";
import { assignStudentToInstrument } from "@/actions/actions";
import { toast } from "react-hot-toast";

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
export default function InstrumentCardList({
  instrumentSearchResults
}: InstrumentCardListProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const dropDownList = useAppSelector(state => state.students.dropDownList)
  const schoolName = useAppSelector(state => state.searchOptions.school)
  const columns = [
    { key: "classification", label: "Instrument Type" },
    { key: "brand", label: "Brand" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "rentStatus", label: "Status" },
    { key: "school", label: "School" },
    { key: "student", label: "Assign Student" },
  ]

  // filter the data based on parameters

  const filteredSchools = useMemo(() => {
    return instrumentSearchResults.filter(school => school?.school.name === schoolName)
  }, [instrumentSearchResults, schoolName]);
  const filteredDropDownList = useMemo(() => {
    const safeDropDownList = dropDownList ?? []
    return safeDropDownList.filter(student => student?.school?.name === schoolName)
  }, [dropDownList, schoolName]);
  // Use table view for larger screens, card view for mobile
  const [isPending, startTransition] = useTransition()

  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const instrumentId = formData.get("instrumentId") as string;
    const studentId = formData.get("studentId") as string;
    const rentStatus = formData.get("rentStatus") as RentStatus;

    try {
      let response;
      if (rentStatus === "Rented") {
        response = await unassignStudentFromInstrument(instrumentId, studentId);
      } else {
        response = await assignStudentToInstrument(formData, instrumentId);
      }

      const updatedDropDownList = await getDropDownList(session.data?.user?.id as string)
      dispatch(setDropDownList(updatedDropDownList))

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error processing request")
    }
  }, null)

  // Use table view for larger screens, card view for mobile
  return (
    <article className="h-full w-full">
      {/* Table view for larger screens */}
      <section className="hidden md:flex md:justify-center">
        <Table aria-label="Instruments" className="w-full">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            {filteredSchools.map((item: Instrument) => (
              <TableRow
                key={item?.id as string} className="hover:bg-slate-100"
              >
                <TableCell>{item?.classification}</TableCell>
                <TableCell>{item?.brand}</TableCell>
                <TableCell>{item?.serialNumber}</TableCell>
                <TableCell>{item?.rentStatus}</TableCell>
                <TableCell>{item?.school?.name}</TableCell>
                <TableCell>
                  {item?.rentStatus === "Rented" ? (
                    <form action={(formData) => startTransition(() => formAction(formData))}>
                      <input type="hidden" name="instrumentId" value={item?.id} />
                      <input type="hidden" name="rentStatus" value={item?.rentStatus} />
                      <input type="hidden" name="studentId" value={item?.instrumentAssignment?.student.id} />
                      <Button name={`Unassign ${item.instrumentAssignment?.student.firstName} ${item.instrumentAssignment?.student.lastName}`} type="submit" danger={true} isPending={isPending} />
                    </form>
                  ) : (
                    <form action={(formData) => startTransition(() => formAction(formData))} className="flex gap-2">
                      <input type="hidden" name="instrumentId" value={item?.id} />
                      <input type="hidden" name="rentStatus" value="Available" />
                      <Select name="student" placeholder="Select Student" isRequired className="min-w-48">
                        {filteredDropDownList.map((student) => (
                          <SelectItem
                            key={student?.id}
                            textValue={`${student?.firstName} ${student?.lastName}`}
                          >
                            {student?.firstName} {student?.lastName}
                          </SelectItem>
                        ))}
                      </Select>
                      <Button name="Assign" type="submit" isPending={isPending} />
                    </form>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Card view for mobile */}
      <section className="flex flex-col gap-2 md:hidden ">
        {filteredSchools.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No instruments found for selected school</div>
        ) : (
          filteredSchools.map((item: Instrument) => (
            <InstrumentCard
              key={item?.id}
              instrument={item}
              studentDropDownList={filteredDropDownList}
            />
          ))
        )}
      </section>
    </article>
  )
}