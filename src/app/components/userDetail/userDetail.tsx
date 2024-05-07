"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { getCustomUserData } from "@/app/lib/ReduxSSR/features/userSlice";

export default function UserDetail() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userInfo);
  const userFirstName = user.customUserData?.firstName as string;
  const userLastName = user.customUserData?.lastName as string;

  useEffect(() => {
    dispatch(getCustomUserData());
  }, [dispatch]);
  return (
    <h1 className="text-2xl">
      Hello {userFirstName} {userLastName}
    </h1>
  );
}
