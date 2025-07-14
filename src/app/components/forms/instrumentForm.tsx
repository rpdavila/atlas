"use client";
// react imports
import React, { useRef } from "react";

//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

//compOnent imports
import { Input, Select, SelectItem } from "@heroui/react";
import InstrumentSearchForm from "./instrumentSearchForm";
import { RentStatus } from "@/app/types/formTypes";
import { useSession } from "next-auth/react";
import FormWrapper from "../notification/formWrapper";

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
  const rentStatusOptions = Object.keys(RentStatus)
  const handleAddInstrument = async (formData: FormData) => {
    ref.current?.reset();
    if (!session.data?.user?.id) {
      return { success: false, message: "User not authenticated" };
    }
    try {
      const response = await addInstrument(formData, session.data.user.id);
      return { success: response.success, message: response.message };
    } catch (error) {
      console.warn("Error adding Instrument", error);
      return { success: false, message: "Error adding instrument" };
    }
  }
  return (
    <div className="flex flex-col bg-slate-100 rounded-lg items-center w-full h-full md:h-auto mt-2 p-2">     
      
      <InstrumentSearchForm />      

      {selectOption === "Add Instrument" && (
        <FormWrapper
          formRef={ref}
          className="flex flex-col justify-center items-center w-2/3 gap-4 mt-20 sm:w-2/3 md:w-full md:mt-2"
          action={handleAddInstrument}
          submitButton={{
            name: "Add Instrument",
            type: "submit",
            danger: false,
            pendingName: "Adding Instrument",
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
            required
          />
          <Input
            name="brand"
            label="Brand"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Instrument Brand"
            isClearable
            className="w-full"
            required
          />
          <Input
            name="serialNumber"
            label="Serial Number"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter Serial Number"
            isClearable
            className="w-full"
            required
          />
          <Select
            name="rentStatus"
            label="Instrument Rental Status"
            labelPlacement="outside"
            placeholder="Instrument Rental Status"
            variant="bordered"
            required
          >
            {rentStatusOptions.map((key) => (
              <SelectItem key={key}>{key}</SelectItem>
            ))}

          </Select>

          <Select
            name="schoolId"
            label="Schools"
            labelPlacement="outside"
            placeholder="Schools"
            items={schools}
            selectionMode="single"
            variant="bordered"
            required
          >
            {schools?.map((school) => (
              <SelectItem key={school.id} textValue={school.name}>
                {school.name}
              </SelectItem>
            ))}
          </Select>
        </FormWrapper>
      )}
    </div>
  );
}
