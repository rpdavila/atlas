"use client";
import { useRef, useEffect } from "react";
import { useAppStore } from "@/app/lib/ReduxSSR/hooks";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";

import UserDetail from "../components/userDetail/userDetail";



export default function DashboardMainPage() {
  const store = useAppStore()
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(getStudents())
      store.dispatch(getInstruments())
      store.dispatch(getDropDownList())
      initialized.current = true
    }
  })

  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      {initialized ? "Initializing your data" : <UserDetail />}
    </section>
  );
}
