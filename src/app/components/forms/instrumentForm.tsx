"use client";
// react imports
import React, { useRef } from "react";

//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

//compOnent imports
import { Input, Select, SelectItem } from "@nextui-org/react";
import InstrumentSearchForm from "./instrumentSearchForm";
import { RentStatus } from "@prisma/client";
import Button from "../button/button";
import { useSession } from "next-auth/react";
// server actions
import { addInstrument } from "@/actions/actions";
type School = {
  name: string;
  id: string;
}

export default function InstrumentForm({
  formTitle,
  schools
}: {
  formTitle: string
  schools: School[]

}) {
  const ref = useRef<HTMLFormElement>(null)
  const selectOption = useAppSelector(state => state.searchOptions.type)
  const session = useSession();
  return (
    <div className="flex flex-col bg-white rounded-lg items-center w-full h-screen md:h-auto mt-2">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      <section className="w-full">
        <InstrumentSearchForm />
      </section>

      {selectOption === "Add Instrument" && (
        <form
          ref={ref}
          className="flex flex-col justify-center items-center w-2/3 gap-4 mt-20 sm:w-2/3 md:w-full md:mt-2"
          action={async formData => {
            ref.current?.reset();
            await addInstrument(formData, session.data?.user?.id as string);
          }}
        >
          <Input
            name="classification"
            label="Classification"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter Instrument Type"
            isClearable
            className="w-full mt-2"
          />
          <Input
            name="brand"
            label="Brand"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Instrument Brand"
            isClearable
            className="w-full"
          />
          <Input
            name="serialNumber"
            label="Serial Number"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter Serial Number"
            isClearable
            className="w-full"
          />
          <Select
            name="rentStatus"
            label="Instrument Rental Status"
            labelPlacement="outside"
            placeholder="Instrument Rental Status"
            variant="bordered"
          >
            {Object.keys(RentStatus).map((key) => (
              <SelectItem key={key}>{key}</SelectItem>
            ))}

          </Select>

          <Select
            name="schools"
            label="Schools"
            labelPlacement="outside"
            placeholder="Schools"
            items={schools}
            selectionMode="single"
            variant="bordered"
          >
            {schools?.map((school) => (
              <SelectItem key={school.name} textValue={school.name}>
                {school.name}
              </SelectItem>
            ))}
          </Select>



          <Button danger={false} type="submit" name="Add Instrument" />
        </form>
      )}
    </div>
  );
}
