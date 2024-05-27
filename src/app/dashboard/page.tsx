"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

import SearchStudent from "../components/searchStudent/searchStudent";
import SearchInstrument from "../components/searchInstruments/searchInstruments";


export default function DashBoardMainPage() {
  const dispatch = useAppDispatch()
  const selectOption = useAppSelector(state => state.searchOptions.type)

  return (
    <section className="flex flex-col min-h-screen mt-2 rounded-lg basis-3/4">
      {selectOption === "Search Student" && <SearchStudent />}
      {selectOption === "Search Instrument" && <SearchInstrument />}
    </section>
  );
}
