"use client";
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
  instruments.length === 0 ? dispatch(getInstruments()) : null;
  students.length === 0 ? dispatch(getStudents()) : null;
  dropDownList === undefined ? dispatch(getDropDownList()) : null;
  if (userData === undefined) {
    dispatch(getCustomUserData())
  }

  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      <UserDetail />
    </section>
  );
}
