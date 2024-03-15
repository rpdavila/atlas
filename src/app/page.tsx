"use client";
import UserDetail from "./components/userDetail/userDetail";
import { useAppSelector } from "./redux/hooks";
export default function Home() {
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  return (
    <section className="flex min-h-screen flex-col items-ceter justify-between">
      <div className="max-w-5xl items-center justify-center font-mono">
        
      </div>
    </section>
  );
}
