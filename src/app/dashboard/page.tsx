"use client";
import UserDetail from "../components/userDetail/userDetail";
import { useAppSelector, useAppDispatch } from "../lib/ReduxSSR/hooks";
import { getInstruments } from "../lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList } from "../lib/ReduxSSR/features/studentListSlice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

export default function DashBoardMainPage() {
  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      <UserDetail />
    </section>
  );
}
