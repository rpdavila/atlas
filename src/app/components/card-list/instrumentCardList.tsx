//type imports
import { RentStatus } from "@prisma/client";

//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import Button from "../button/button"
// redux
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

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
  const dropDownList = useAppSelector(state => state.students.dropDownList) ?? []
  const schoolName = useAppSelector(state => state.searchOptions.school) ?? []

  // filter the data based on parameters
  const filteredSChools = instrumentSearchResults.filter(school => school?.school.name === schoolName)
  const filteredDropDownList = dropDownList.filter(student => student?.school?.name === schoolName)

  const columns = [
    { key: "classification", label: "Instrument Type" },
    { key: "brand", label: "Brand" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "rentStatus", label: "Status" },
    { key: "school", label: "School" },
    { key: "actions", label: "Actions" }
  ]

  // Use table view for larger screens, card view for mobile
  return (
    <section className={`${filteredSChools.length > 4 ? "h-full" : "h-screen"} w-full`}>
      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <Table aria-label="Instruments" className="w-full">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            {filteredSChools.map((item: Instrument) => (
              <TableRow key={item?.id} className="hover:bg-slate-100">
                <TableCell>{item?.classification}</TableCell>
                <TableCell>{item?.brand}</TableCell>
                <TableCell>{item?.serialNumber}</TableCell>
                <TableCell>{item?.rentStatus}</TableCell>
                <TableCell>{item?.school?.name}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button name="View Details" type="button" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
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

