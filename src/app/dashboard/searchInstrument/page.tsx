"use client";
//react imports
import { useEffect } from "react";
//redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";

//compnent imports
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments"
import { getInstruments, setInstrumentsInitialized } from "@/lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList, setStudentsInitialized } from "@/lib/ReduxSSR/features/studentListSlice";

export default function InstrumentPage() {
  const dispatch = useAppDispatch();
  const displayInstruments = useAppSelector((state) => state.instruments.instrumentList);
  const instrumentsInitialized = useAppSelector((state) => state.instruments.initialized);
  const studentsInitialized = useAppSelector((state) => state.students.initialized);

  useEffect(() => {
    if (!instrumentsInitialized) {
      dispatch(getInstruments());
      dispatch(setInstrumentsInitialized())
    }
    if (!studentsInitialized) {
      dispatch(getStudents());
      dispatch(getDropDownList());
      dispatch(setStudentsInitialized())
    }

  }, [dispatch, instrumentsInitialized, studentsInitialized])
  return (
    <>
      <SearchInstrument displayInstruments={displayInstruments}  />
    </>
  )
}