"use client";
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments"
import { getInstruments, setInstrumentsInitialized } from "@/app/lib/ReduxSSR/features/instrumentSLice";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { InstrumentList, StudentList } from "@/app/types/formTypes";
import { convertObjectIdToString } from "@/app/utilities/mongodb";
import { useMongoDbDataAccess } from "@/app/hooks/useMongoDbDataAccess";
import { setStudentsInitialized } from "@/app/lib/ReduxSSR/features/studentListSlice";

export default function InstrumentPage() {

  return (
    <>
      <SearchInstrument />
    </>
  )
}