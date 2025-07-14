"use client";
//nextui
import { RadioGroup, Radio } from "@heroui/react";
// redux
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSchool } from "@/lib/ReduxSSR/features/searchOptionsSlice";

export default function SchoolSelectForm({ schools }: { schools: { id: string, name: string }[] }) {
  const dispatch = useAppDispatch();
  const selectedSchool = useAppSelector((state) => state.searchOptions.school);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSchool(e.target.value))
  }
  return (
    <>
      <form
        className="bg-slate-100 rounded-lg w-full p-4 border border-slate-600"
      >
        {schools
          ? (<RadioGroup
            name="school"
            label="Select a school"
            className="text-slate-600"
            onChange={handleChange}
            defaultValue={`${selectedSchool}`}
          >
            {schools.map((school) => (
              <Radio
                key={school.id}
                value={school.name}
                className="text-slate-600"
              >
                {school.name}
              </Radio>
            ))}
          </RadioGroup>
          ) : <p className="text-slate-200">No schools found</p>}
      </form>
    </>
  )
}


