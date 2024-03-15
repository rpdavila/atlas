"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { getCustomUserData } from "@/app/redux/features/userSlice";

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
