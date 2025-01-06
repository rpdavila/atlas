"use client";
//react imports
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
import { setType } from "@/lib/ReduxSSR/features/searchOptionsSlice";
//component imports

import { Select, SelectItem } from "@nextui-org/react";
import { tools } from "@/app/data/tools";

type SearchOptionProps = {
  children: React.ReactNode;
};

export default function SelectSearchOptions({ children }: SearchOptionProps) {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const router = useRouter();

  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );



  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setType(value));
    if (value === "Search Student") router.push("/dashboard/searchStudent");
    if (value === "Search Instrument") router.push("/dashboard/searchInstrument");
    if (value === "Search District") router.push("/dashboard/districtInstruments");
  }


  return (
    <>
      <div className="hidden sm:flex w-full">
        <Select
          label="Tools"
          className="max-w-screen-xl"
          onChange={handleChange}
        >
          {tools.map((tool) => (
            <SelectItem
              key={tool.key}
            >
              {tool.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      {children}
    </>
  );
}
