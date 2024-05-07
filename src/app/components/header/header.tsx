"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { setType } from "@/app/lib/ReduxSSR/features/searchOptionsSlice";
import { logOutUser } from "../../lib/ReduxSSR/features/userSlice";

import { navList, dashBoardNavList } from "@/app/data/nav-List";
import Button from "../button/button";

export default function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  const pathName = usePathname();
  const router = useRouter();

  const handleClickSignIn = () => {
    if (isLoggedIn) {
      dispatch(logOutUser());
      router.push("/");
    } else {
      router.push("/signIn");
    }
  };

  const handleClickNav = () => {
    dispatch(setType(""));
  };
  return (
    <header className=" bg-white">
      <nav className="flex justify-end h-20">
        <ul className="flex flex-row items-center">
          
          {isLoggedIn ? (
            <>
              {dashBoardNavList.map((items, index) => {
                return (
                  <li key={index} className="p-2">
                    <Link
                      onClick={handleClickNav}
                      href={items.href}
                      className={
                        pathName === items.href
                          ? "active: text-blue-700 underline underline-offset-4 "
                          : "text-blue-500 hover:underline underline-offset-4"
                      }
                    >
                      {items.name}
                    </Link>
                  </li>
                );
              })}
            </>
           
          ) : (
            <>
              {navList.map((items, index) => {
                return (
                  <li key={index} className="p-2">
                    <Link
                      onClick={handleClickNav}
                      href={items.href}
                      className={
                        pathName === items.href
                          ? "active: text-blue-700 underline underline-offset-4 "
                          : "text-blue-500 hover:underline underline-offset-4"
                      }
                    >
                      {items.name}
                    </Link>
                  </li>
                );
              })}
            </>
          )}
          <Button
            type="button"
            name={isLoggedIn ? "Log Out" : "Log In"}
            marginTop="0"
            onClick={handleClickSignIn}
          />
        </ul>
      </nav>
    </header>
  );
}
