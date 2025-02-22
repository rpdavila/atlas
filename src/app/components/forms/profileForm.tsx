"use client";
//react imports
import { useRef } from "react";
//ui imports
import { Input, Select, SelectItem } from "@heroui/react"
import Button from "../button/button"
// action imports
import { createProfile } from "@/actions/actions";
//data imports
import { roles } from "@/app/data/roles";
import { useSession } from "next-auth/react";
// redux
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDistrict, setSchools } from "@/lib/ReduxSSR/features/userSlice";
import { District } from "@prisma/client";


export default function ProfileForm() {
  const ref = useRef<HTMLFormElement>(null);
  const session = useSession();
  const dispatch = useAppDispatch();

  return (
    <form
      className=" flex flex-col items-center gap-2 basis-3/4 ms:w-full"
      ref={ref}
      action={async (formData: FormData) => {
        ref.current?.reset();
        const data = await createProfile(formData, session.data?.user?.id as string)

        dispatch(setSchools({
          district: data?.district?.name,
          schools: data?.schools
        }))
        dispatch(setDistrict({
          name: data?.district?.name as string
        }))
      }}
    >
      <Input
        label="School Name"
        labelPlacement="inside"
        type="text"
        name="school/s"
        placeholder="Enter School Name"
        isClearable
        isRequired
      />

      <Input
        label="District Name"
        labelPlacement="inside"
        type="text"
        name="district"
        placeholder="Enter District Name"
        isClearable
        isRequired
      />

      <Input
        label="State Name"
        labelPlacement="inside"
        type="text"
        name="state"
        placeholder="Enter State Name"
        isClearable
        isRequired
      />

      <Select
        label="Role"
        labelPlacement="inside"
        name="role"
        placeholder="Select a Role"
        isRequired
      >
        {roles.map((role) => (
          <SelectItem key={role.key}>
            {role.label}
          </SelectItem>
        ))}
      </Select>
      <Button
        type="submit"
        name="Add Profile" />
    </form >
  )
}