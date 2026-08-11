"use client";
//react imports
import { useMemo } from "react";
//type imports
import { RentStatus } from "@prisma/client";

//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import Button from "../button/button"
import FormWrapper from "../notification/formWrapper";

// redux
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

//hooks
import { useInstrumentAssignmentAction } from "@/lib/hooks/useInstrumentAssignmentAction";

//server actions
import { removeInstrument } from "@/actions/actions";
import StudentDropDownList from "../studentDropDownList/studentDropDownList";

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
  const dropDownList = useAppSelector(state => state.students.dropDownList)
  const schoolName = useAppSelector(state => state.searchOptions.school)
  const columns = [
    { key: "classification", label: "Instrument Type" },
    { key: "brand", label: "Brand" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "rentStatus", label: "Status" },
    { key: "school", label: "School" },
    { key: "student", label: "Assign Student" },
    { key: "Remove Instrument", label: "Remove Instrument"}
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

  const { handleAssignmentAction, isPending } = useInstrumentAssignmentAction();

  // if (!filteredSchools.length) {
  //   return (
  //     <>
  //      <h1 className="text-xl text-slate-200">No instruments found</h1>
  //     </>
  //   )
  // }
  // Use table view for larger screens, card view for mobile
  return (
    <article className="h-full w-full">
      {/* Table view for larger screens */}
      <section className="hidden md:flex md:justify-center">
        <Table aria-label="Instruments" className="w-full" data-cy="Table">
          <TableHeader columns={columns} data-cy="TableHeader">
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody data-cy="TableBody">
            {filteredSchools.map((item: Instrument) => (
              <TableRow
                key={item?.id} className="hover:bg-slate-100"
                data-cy="table-row"
              >
                <TableCell>{item?.classification}</TableCell>
                <TableCell>{item?.brand}</TableCell>
                <TableCell>{item?.serialNumber}</TableCell>
                <TableCell>{item?.rentStatus}</TableCell>
                <TableCell>{item?.school?.name}</TableCell>
                <TableCell>
                  {item?.rentStatus === "Rented" ? (
                    <form action={handleAssignmentAction}>
                      <input type="hidden" name="instrumentId" value={item?.id} />
                      <input type="hidden" name="rentStatus" value={item?.rentStatus} />
                      <input type="hidden" name="studentId" value={item?.instrumentAssignment?.student.id} />
                      <Button
                        name={`Unassign ${item.instrumentAssignment?.student.firstName} ${item.instrumentAssignment?.student.lastName}`}
                        pendingName="Unassigning Student"
                        type="submit"
                        danger={true}
                        isPending={isPending}
                      />
                    </form>
                  ) : (
                    <form action={handleAssignmentAction} className="flex gap-2">
                      <input type="hidden" name="instrumentId" value={item?.id} />
                      <input type="hidden" name="rentStatus" value="Available" />
                      <StudentDropDownList studentDropDownList={filteredDropDownList} />
                      <Button name="Assign" pendingName="Assigning Student" type="submit" isPending={isPending} />
                    </form>
                  )}
                </TableCell>
                <TableCell>
                  <FormWrapper
                    action={async (formData: FormData) => removeInstrument(formData)}
                    submitButton={{
                    name: "Remove Instrument",
                    danger: true,
                    pendingName: "Removing Student",
                    type: "submit"
                    }}
                  >
                    <input name="instrumentId" type="hidden" value={item?.id}/>
                  </FormWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Card view for mobile */}
      <section className="flex flex-col gap-2 md:hidden ">
        {filteredSchools.length === 0 ? (
          <div className="sm:hidden text-center text-gray-500 py-8">No instruments found for selected school</div>
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