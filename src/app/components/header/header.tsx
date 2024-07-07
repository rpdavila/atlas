"use client";
import { useEffect, useState } from "react";

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

  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  // move to redux??
  useEffect(() => {
    const removeElementWhenScreenSizeChanges = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      }
      if (window.innerWidth > 640) {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", removeElementWhenScreenSizeChanges);

    return () => window.removeEventListener("resize", removeElementWhenScreenSizeChanges);
  }, [])
  console.log(`isMobile: ${isMobile}`)
  return (
    <header className=" bg-white w-auto">
      <nav className="flex items-center sm:flex justify-end h-20">
        {isMobile
          ? (
            <button className="flex justify-evenly items-center flex-col mr-5 w-5 h-10">
              <div className="bg-black w-full h-1"></div>
              <div className="bg-black w-full h-1"></div>
              <div className="bg-black w-full h-1"></div>
            </button>
          )
          : (
            <>
              <ul className="flex flex-row items-center w-auto">
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
            </>
          )}
      </nav>
    </header>
  );
}
