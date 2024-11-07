"use client";
//react imports
import React, { useRef } from "react";

// redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";

//component imports
import { Input, Select, SelectItem } from "@nextui-org/react";
import Button from "../button/button";
//hooks imports
import StudentSearchForm from "./studentSearchForm";
//sesison import
import { useSession } from "next-auth/react";
//server actions
import { addStudent, getDropDownList } from "@/actions/actions";
import { permanentRedirect } from "next/navigation";
import { setDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";

//types
type School = {
  name: string;
  id: string;
}

type StudentFormProps = {
  formTitle: string;
  schools: School[];
}

export default function StudentForm({
  formTitle,
  schools
}: StudentFormProps) {

  const ref = useRef<HTMLFormElement>(null)
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  const session = useSession();
  const dispatch = useAppDispatch();

  if (session.status === "unauthenticated") {
    permanentRedirect("/signIn");
  }

  return (
    <div className="flex flex-col bg-white rounded-lg items-center mt-2 w-full h-screen md:h-auto">
      <h1 className="bg-blue-500 rounded-t-lg w-full self-center text-white text-center">
        {formTitle}
      </h1>
      {selectOption === "Search Student" && (
        <section>
          <StudentSearchForm />
        </section>
      )}
      {selectOption === "Add Student" && (
        <form
          className="flex flex-col justify-center items-center w-2/3 gap-4 mt-20 sm:w-2/3 md:w-full md:mt-2"
          ref={ref}
          action={async formData => {
            ref.current?.reset();
            await addStudent(formData, session.data?.user?.id as string);
            const students = await getDropDownList(session.data?.user?.id as string);
            dispatch(setDropDownList(students))
          }}
        >
          <Input
            name="firstName"
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter first name"
            variant="bordered"
            isClearable
            className="w-full"
          />

          <Input
            name="lastName"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter last name"
            variant="bordered"
            isClearable
            className="w-full"
          />

          <Input
            name="studentIdNumber"
            label="Student Id Number"
            labelPlacement="outside"
            placeholder="Enter Student Id Number"
            variant="bordered"
            isClearable
            className="w-full"
          />

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

          <Button
            type="submit"
            name="Add Student"
          />
        </form>
      )}
    </div>
  );
}
