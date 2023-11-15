"use client";
//react imports
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// redux imports
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "@/app/redux/store";
import { setType } from "@/app/redux/features/searchOptionsSlice";
//component imports
import CheckBox from "../input/custumInputCheckbox";
import { requestToBodyStream } from "next/dist/server/body-streams";

type SearchOptionProps = {
  children: React.ReactNode;
};

export default function SelectSearchOptions({ children }: SearchOptionProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setType(value));
    if (selectOption === "Search Student" || "Search Instrument") {
      router.push("/search");
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg p-2 items-center w-full">
        <h2 className="underline">Tool Bar:</h2>
        <div>
          <CheckBox
            labelName="Search Student"
            checked={selectOption === "Search Student"}
            value="Search Student"
            onChange={handleChange}
          />
          <CheckBox
            labelName="Search Instrument"
            checked={selectOption === "Search Instrument"}
            value="Search Instrument"
            onChange={handleChange}
          />
          <CheckBox
            labelName="Add Student"
            checked={selectOption === "Add Student"}
            value="Add Student"
            onChange={handleChange}
          />
          <CheckBox
            labelName="Add Instrument"
            checked={selectOption === "Add Instrument"}
            value="Add Instrument"
            onChange={handleChange}
          />
        </div>
      </div>
      {children}
    </>
  );
}
