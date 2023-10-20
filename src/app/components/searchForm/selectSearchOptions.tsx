"use client";
//react imports
import React from "react";
import { useRouter } from "next/navigation";

// redux imports
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "@/app/redux/store";
import {
  setStudentSearch,
  setInstrumentSearch,
  setStudent,
  setInstrument,
} from "@/app/redux/features/searchOptionsSlice";
//component imports
import CheckBox from "../input/custumInputCheckbox";

type SearchOptionProps = {
  children: React.ReactNode;
};

export default function SelectSearchOptions({ children }: SearchOptionProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectInstrumentOption = useAppSelector(
    (state: RootState) => state.searchOptions.searchInstrument
  );
  const selectStudentOption = useAppSelector(
    (state: RootState) => state.searchOptions.searchStudent
  );
  const selectAddStudentOption = useAppSelector(
    (state: RootState) => state.searchOptions.addStudent
  );
  const selectAddInstrumentOption = useAppSelector(
    (state: RootState) => state.searchOptions.addInstrument
  );

  const handleChangeStudent = () => {
    dispatch(setStudentSearch(!selectStudentOption));
    router.push("/search");
  };

  const handleChangeInstrument = () => {
    dispatch(setInstrumentSearch(!selectInstrumentOption));
    router.push("/search");
  };

  const handleChangeAddStudent = () => {
    dispatch(setStudent(!selectAddStudentOption));
  };

  const handleCHangeAddInstrument = () => {
    dispatch(setInstrument(!selectAddInstrumentOption));
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg p-2 items-center w-full">
        <h2 className="underline">Tool Bar:</h2>
        <fieldset>
          <CheckBox
            type="checkbox"
            labelName="Search Student"
            checked={selectStudentOption}
            onChange={handleChangeStudent}
          />
          <CheckBox
            type="checkbox"
            labelName="Search Instrument"
            checked={selectInstrumentOption}
            onChange={handleChangeInstrument}
          />
          <CheckBox
            type="checkbox"
            labelName="Add Student"
            checked={selectAddStudentOption}
            onChange={handleChangeAddStudent}
          />
          <CheckBox
            type="checkbox"
            labelName="Add Instrument"
            checked={selectAddInstrumentOption}
            onChange={handleCHangeAddInstrument}
          />
        </fieldset>
      </div>
      {children}
    </>
  );
}
