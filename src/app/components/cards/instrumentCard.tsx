// react imports
import { useState } from "react";
//redux imports
// import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
// import { addStudentToInstrument, getInstruments, unassignStudentFromInstrument } from "@/lib/ReduxSSR/features/instrumentSLice";
// import { assignInstrumentToStudent, getDropDownList, getStudents, unassignInstrumentFromStudent } from "@/lib/ReduxSSR/features/studentListSlice";

// type imports
import { InstrumentDetails, StudentInfo, StudentList } from "@/app/types/formTypes";
//component imports
import Button from "../button/button";
import { Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useStudentList } from "@/app/hooks/useStudentList";
// server action
import { getStudents, updateInstrument } from "@/actions/actions";
import InstrumentSearchForm from "../forms/instrumentSearchFrom";
type CardProps = {
  instrument: InstrumentDetails;
  hasMore: boolean;
  isLoading: boolean;
  studentDropDownList: StudentList,
  onLoadMore: () => void;
};

export default function InstrumentCard({ instrument, hasMore, isLoading, onLoadMore, studentDropDownList }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);



  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <section className="flex flex-col items-center w-full justify-evenly bg-white sm:flex-row sm:w-full rounded-lg">
      <div className="flex flex-col w-auto sm:w-1/3 justify-center items-start m-6 ">
        <p>
          <strong>Instrument type: </strong>
          {instrument?.classification}
        </p>
        <p>
          <strong>Brand: </strong>
          {instrument?.brand}
        </p>
        <p>
          <strong>Serial Number: </strong>
          {instrument?.serialNumber}
        </p>
        <p>
          <strong>Rent Status: </strong>
          {instrument?.rentStatus}
        </p>
      </div>
      {instrument?.rentStatus === "Rented" ? (
        <div className="flex flex-col items-start justify-center m-6">
          <strong>
            <h1>Assigned to: </h1>
          </strong>
          <p>
            <strong>First Name:</strong>
            {instrument.assignedTo?.firstName}
          </p>
          <p>
            <strong>Last Name: </strong> {instrument.assignedTo?.lastName}
          </p>
          <p>
            <strong>Student Id Number: </strong>
            {instrument.assignedTo?.studentIdNumber}
          </p>
          <Button type="submit" name="Unassign Student" loadingName="Unassigning Student..." marginTop="0" />
        </div>

      ) : (

        <Select
          isLoading={isLoading}
          items={studentDropDownList as StudentList}
          label="Assign Student"
          placeholder="Assign Student"
          scrollRef={scrollerRef}
          selectionMode="single"
          onOpenChange={setIsOpen}
          className="max-w-xs"

        >
          {(item) => (
            <SelectItem key={item.studentIdNumber} textValue={`${item.firstName} ${item.lastName}`}>
              {item.firstName} {item.lastName}
            </SelectItem>
          )}
        </Select>
      )}
    </section>

  );
}
