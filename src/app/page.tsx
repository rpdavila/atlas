"use client";
import UserDetail from "./components/userDetail/userDetail";
import { useAppSelector } from "./redux/hooks";
export default function Home() {
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between basis-3/4 bg-white mt-2 rounded-lg">
      <div className="max-w-5xl w-full items-center justify-center font-mono lg:flex">
        {isLoggedIn && <UserDetail />}
      </div>
    </main>
  );
}
