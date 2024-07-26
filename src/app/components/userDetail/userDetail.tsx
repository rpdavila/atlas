"use client";
import { useRef } from "react";
import { useAppSelector, useAppStore } from "@/lib/ReduxSSR/hooks";
import { getCustomUserData } from "@/lib/ReduxSSR/features/userSlice";
import { UnknownAction } from "@reduxjs/toolkit";

export default function UserDetail() {


  return (
    <section className="flex justify-center text-2xl bg-white rounded-lg basis-3/4">
      <h1>
        Hello
      </h1>
    </section>

  );
}
