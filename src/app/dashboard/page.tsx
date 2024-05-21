"use client";
import { useRef, useEffect } from "react";
import { useAppStore, useAppDispatch, useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

import { StudentList } from "@/app/types/formTypes";
import UserDetail from "../components/userDetail/userDetail";
import SearchStudent from "../components/searchStudent/searchStudent";
import SearchInstrument from "../components/searchInstruments/searchInstruments";


export default function DashBoardMainPage({
  displayStudents
}: {
  displayStudents: StudentList | undefined;
}) {
  const selectOption = useAppSelector(state => state.searchOptions.type)
  const store = useAppStore()
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(getStudents())
      store.dispatch(getInstruments())
      store.dispatch(getDropDownList())
      store.dispatch(getCustomUserData())
      initialized.current = true
    }
  })

  return (
    <section className="flex flex-col min-h-screen mt-2 rounded-lg basis-3/4">
      {selectOption === "Search Student" && <SearchStudent />}
      {selectOption === "Search Instrument" && <SearchInstrument />}
    </section>
  );
}
