"use client";
import React from "react";
import { useRef } from "react";
import { useAppStore } from "../lib/ReduxSSR/hooks";
import { getStudents, getDropDownList } from "../lib/ReduxSSR/features/studentListSlice";
import { getInstruments } from "../lib/ReduxSSR/features/instrumentSLice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

type DashBoardMainPageProps = {
  children: React.ReactNode;
};

export default function DashBoardMainPage({children}: DashBoardMainPageProps) {
  const store = useAppStore()
  const initialized = useRef(false) // only run once
     
    if (!initialized.current) {
      store.dispatch(getStudents())
      store.dispatch(getInstruments())
      store.dispatch(getDropDownList())
      store.dispatch(getCustomUserData())
      initialized.current = true
    }

  
  return (
    <section className="flex flex-col mt-2 rounded-lg basis-3/4 justify-center">
      {children}
    </section>
  );
}
