"use client";
"use strinct";
import { useEffect } from "react";
import UserDetail from "../components/userDetail/userDetail";
import { useAppSelector, useAppDispatch } from "../lib/ReduxSSR/hooks";
import { getInstruments } from "../lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList } from "../lib/ReduxSSR/features/studentListSlice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

export default function DashBoardMainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const persistedData = window.localStorage.getItem('persist:root');
    if (!persistedData) {
      dispatch(getInstruments())
      dispatch(getStudents())
      dispatch(getDropDownList())
      dispatch(getCustomUserData())
    } 
  }, [dispatch])
return (
  <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
    <UserDetail />
  </section>
);
}
