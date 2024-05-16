"use client";
import { useEffect } from "react";
import UserDetail from "../components/userDetail/userDetail";
import { useAppSelector, useAppDispatch } from "../lib/ReduxSSR/hooks";
import { getInstruments } from "../lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList } from "../lib/ReduxSSR/features/studentListSlice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

export default function DashBoardMainPage() {
  const dispatch = useAppDispatch();
  const instruments = useAppSelector((state) => state.instruments.instrumentList);
  const students = useAppSelector((state) => state.students.studentList);
  const dropDownList = useAppSelector((state) => state.students.dropDownList)
  const userData = useAppSelector((state) => state.userInfo.customUserData)


  useEffect(() => {
    instruments.length === 0 ? dispatch(getInstruments()) : null;
    students.length === 0 ? dispatch(getStudents()) : null;
    dropDownList.length === 0 ? dispatch(getDropDownList()) : null;
    userData === undefined ? dispatch(getCustomUserData()) : null

  }, [instruments.length, students.length, dropDownList.length, userData, dispatch])
  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      <UserDetail />
    </section>
  );
}
