"use client";
//react imports
import { useRef, useState } from "react";
//ui imports
import { Input, Select, SelectItem } from "@heroui/react"
import FormWrapper from "@/app/components/notification/formWrapper";
// action imports
import { createProfile } from "@/actions/actions";
//data imports
import { roles } from "@/app/data/roles";
import { useSession } from "next-auth/react";
// redux
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDistrict, setSchools } from "@/lib/ReduxSSR/features/userSlice";


export default function ProfileForm() {
  const ref = useRef<HTMLFormElement>(null);
  const session = useSession();
  const dispatch = useAppDispatch();
  const handleCreateProfile = async (formData: FormData) => {
    ref.current?.reset();
    try {
      const data = await createProfile(formData, session.data?.user?.id as string)

      dispatch(setSchools({
        district: data?.profileData.district?.name,
        schools: data?.profileData.schools
      }))
      dispatch(setDistrict({
        name: data?.profileData?.district?.name as string
      }))
      return { success: data?.success, message: data?.message }
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error creating profile" }
    }
  }


  return (
    <FormWrapper
      className=" flex flex-col items-center gap-2 basis-3/4 ms:w-full"
      formRef={ref}
      action={handleCreateProfile}
      submitButton={{
        name: "Create Profile",
        type: "submit",
        danger: false,
        pendingName: "Creating Profile"
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
    </FormWrapper>
  )
}