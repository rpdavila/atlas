"use client";
"use strict";
import { useEffect } from "react";
import UserDetail from "../components/userDetail/userDetail";
import { useAppSelector, useAppDispatch } from "../lib/ReduxSSR/hooks";
import { getInstruments } from "../lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList } from "../lib/ReduxSSR/features/studentListSlice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

export default function DashBoardMainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const item = localStorage.getItem('persist:root')
      if (item) {
        const data = JSON.parse(item);
        const instruments = JSON.parse(data.instruments);
        const students = JSON.parse(data.students);
        const user = JSON.parse(data.userInfo);
        if (instruments.instrumentList.length === 0) {
          dispatch(getInstruments());
        }
        if (students.studentList.length === 0) {
          dispatch(getStudents());
        }
        if (students.dropDownList.length === 0) {
          dispatch(getDropDownList());
        }
        if (user.customUserData === undefined) {
          dispatch(getCustomUserData());
        }
      }

    }
    catch (error) {
      console.log(error)
    }
  }, [dispatch])
  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      <UserDetail />
    </section>
  );
}
