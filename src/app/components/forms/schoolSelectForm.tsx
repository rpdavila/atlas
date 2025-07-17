"use client";
//react
import { useEffect, useState } from "react";
//nextui
import { RadioGroup, Radio } from "@heroui/react";
// redux
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSchool } from "@/lib/ReduxSSR/features/searchOptionsSlice";

export default function SchoolSelectForm({ schools }: { schools: { id: string, name: string }[] }) {
  const dispatch = useAppDispatch();
  const selectedSchool = useAppSelector((state) => state.searchOptions.school);
  
  // Initialize with first school if available
  useEffect(() => {
    if (schools && schools.length > 0 && !selectedSchool) {
      dispatch(setSchool(schools[0].name));
    }
  }, [schools, selectedSchool, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSchool(e.target.value));
  }
  
  return (
    <>
      <form
        className="bg-slate-100 rounded-lg w-full p-4 border border-slate-600"
      >
        {schools && schools.length > 0 ? (
          <RadioGroup
            name="school"
            label="Select a school"
            className="text-slate-600"
            onChange={handleChange}
            value={selectedSchool || (schools[0]?.name || "")}
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


