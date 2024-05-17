"use client";
import { useRef, useEffect } from "react";
import { useAppSelector, useAppStore } from "@/app/lib/ReduxSSR/hooks";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";

import UserDetail from "../components/userDetail/userDetail";

export default function DashboardMainPage() {
  const store = useAppStore()
  const initialized = useRef(false)
  const studentsLoading = useAppSelector((state) => state.students.loading)
  const instrumentsLoading = useAppSelector((state) => state.instruments.loading)
  const dropDownListLoading = useAppSelector((state) => state.students.loading)

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(getStudents())
      store.dispatch(getInstruments())
      store.dispatch(getDropDownList())
      initialized.current = true
    }
  })


  if (studentsLoading || instrumentsLoading || dropDownListLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      <UserDetail />
    </section>
  );
}
