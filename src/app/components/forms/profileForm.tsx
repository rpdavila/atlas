"use client";
//react imports
import { ChangeEvent, useRef, useState } from "react";
//auth imports
import { useSession } from "next-auth/react";
//ui imports
import { Select, SelectItem } from "@heroui/react"
import FormWrapper from "@/app/components/notification/formWrapper";
// action imports
import { createProfile } from "@/actions/actions";
//data imports
import { roles } from "@/app/data/roles";
import { schoolsData } from "@/app/data/schoolsData";

// redux
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDistrict, setSchools } from "@/lib/ReduxSSR/features/userSlice";
import { redirect } from "next/navigation";


export default function ProfileForm() {
  const ref = useRef<HTMLFormElement>(null);
  const session = useSession();
  const dispatch = useAppDispatch();
  if (session.status === "unauthenticated") {
    redirect("/");
  }
  
  const [state, setStateName] = useState<string>("");
  const [districtList, setDistrictList] = useState<{key:string, name:string}[]>([]);
  const [schoolsList, setSchoolsList] = useState<{key:string, name:string}[]>([]);
  const [districtName, setDistrictName] = useState<string>("");

  function FindDistricts(state: string) {
    const districts = schoolsData.find((data) => data.state.name === state);
    if (!districts) return ;
    setDistrictList(districts.state.district.map((district) => ({ key: district.key, name: district.name})));
  }

  function FindSchools(district: {
    key: string;
    name: string;
    schools: {
        key: string;
        name: string;
    }[] } | undefined) {
      const schools = district?.schools.map(school => ({ key: school.key, name: school.name }));
      if (!schools) return;
      setSchoolsList(schools);
  }

  const handleStateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStateName(e.target.value);
    FindDistricts(e.target.value);  
  }

  const handleDistrictSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrictName(e.target.value); 
    const district = schoolsData.find((data) => data.state.name === state)?.state.district.find((d) => d.name === e.target.value);
    FindSchools(district);
  }

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
      <Select
        label="State Name"
        labelPlacement="inside"
        name="state"
        placeholder="Enter State Name"
        selectedKeys={[state]}
        isClearable
        isRequired
        onChange={handleStateSelect}
      >
        {schoolsData.map((state) => (
          <SelectItem key={state.state.name}>
            {state.state.name} 
          </SelectItem>
        ))}
      </Select> 

      <Select
        label="District"
        labelPlacement="inside"
        name="district"
        placeholder="District"
        items={districtList}
        selectedKeys={[districtName]}
        isClearable
        isRequired
        onChange={handleDistrictSelect}
      >
        {(district) => <SelectItem key={district.key}>{district.name}</SelectItem>}
      </Select>

      <Select
        label="Schools"
        labelPlacement="inside"
        name="schools"
        placeholder="Select a School or Schools"
        selectionMode="multiple"
        isClearable
        isRequired
      >
        {schoolsList.map((school) => (
          <SelectItem key={school.key}>
            {school.name}
          </SelectItem>
        ))}
      </Select>

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