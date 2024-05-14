"use client";
import { useRef } from "react";
import { useAppStore } from "@/app/lib/ReduxSSR/hooks";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";

import UserDetail from "../components/userDetail/userDetail";



export default function DashboardMainPage() {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(getStudents())
    store.dispatch(getInstruments())
    store.dispatch(getDropDownList())
    initialized.current = true
  }
  return (
    <section className="flex bg-white mt-2 rounded-lg basis-3/4 justify-center">
      <UserDetail />
    </section>
  );
}
