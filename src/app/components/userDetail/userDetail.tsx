"use client";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/ReduxSSR/hooks";
import { getCustomUserData } from "@/lib/ReduxSSR/features/userSlice";
import { UnknownAction } from "@reduxjs/toolkit";

export default function UserDetail() {
  const store = useAppStore();
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(getCustomUserData() as unknown as UnknownAction)
    initialized.current = true
  }
  const user = useAppSelector((state) => state.userInfo)
  const userFirstName = user.customUserData?.firstName as string;
  const userLastName = user.customUserData?.lastName as string;

  return (
    <section className="flex justify-center text-2xl  bg-white rounded-lg basis-3/4">
      <h1>
        Hello {userFirstName} {userLastName}
      </h1>
    </section>

  );
}
