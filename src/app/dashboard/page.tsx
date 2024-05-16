"use client";
import { useEffect, useState } from "react";
import UserDetail from "../components/userDetail/userDetail";
import { useAppSelector, useAppDispatch } from "../lib/ReduxSSR/hooks";
import { getInstruments } from "../lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList } from "../lib/ReduxSSR/features/studentListSlice";
import { getCustomUserData } from "../lib/ReduxSSR/features/userSlice";

export default function DashBoardMainPage() {
  const dispatch = useAppDispatch();
  const instrumentList = useAppSelector((state) => state.instruments.instrumentList);
  const studentList = useAppSelector((state) => state.students.studentList);
  const dropDownList = useAppSelector((state) => state.students.dropDownList);
  const userCustomData = useAppSelector((state) => state.userInfo.customUserData);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!instrumentList || Object.keys(instrumentList).length === 0) {
      dispatch(getInstruments());
    }
    if (!studentList || Object.keys(studentList).length === 0) {
      dispatch(getStudents());
    }
    if (!dropDownList || Object.keys(dropDownList).length === 0) {
      dispatch(getDropDownList());
    }

    if (!userCustomData) {
      dispatch(getCustomUserData());
    }
    setLoading(false);


  }, [dispatch, instrumentList, studentList, dropDownList, userCustomData]);
  return (
    <section className="flex flex-col min-h-screen bg-white mt-2 rounded-lg basis-3/4 items-center">
      {loading ? "loading..." : <UserDetail />}
    </section>
  );
}
