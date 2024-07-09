"use client";
// react imports
import { useState } from "react";
//next imports
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
//redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setType } from "@/lib/ReduxSSR/features/searchOptionsSlice";
import { logOutUser } from "@/lib/ReduxSSR/features/userSlice";
import { setIsMobile } from "@/lib/ReduxSSR/features/windowSlice";
//component imports
import { navList, dashBoardNavList } from "@/app/data/nav-List";
import Button from "../button/button";
//hooks
import useViewport from "@/app/hooks/useViewport";

export default function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  const isMobile = useAppSelector((state) => state.window.isMobile);
  const pathName = usePathname();
  const router = useRouter();
  const windowSize = useViewport();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //check window size
  windowSize.width > 768 ? dispatch(setIsMobile(false)) : dispatch(setIsMobile(true));
  return (
    <header className=" bg-white w-auto">
      <nav className="flex items-center sm:flex justify-end h-20">
        {isMobile
          ? (
            <>
              <button
                className="flex justify-evenly items-center flex-col mr-5 w-5 h-10"
                onClick={toggleMenu}
              >
                <span className="bg-black w-full h-0.5"></span>
                <span className="bg-black w-full h-0.5"></span>
                <span className="bg-black w-full h-0.5"></span>
              </button>
              {isMenuOpen && (
                <div className="menu-links mt-4">
                  <Link href="/home" onClick={toggleMenu} className="block py-2 px-4 text-sm text-black hover:bg-gray-700">Home</Link>
                  <Link href="/about" onClick={toggleMenu} className="block py-2 px-4 text-sm text-black hover:bg-gray-700">About</Link>
                  <Link href="/services" onClick={toggleMenu} className="block py-2 px-4 text-sm text-black hover:bg-gray-700">Services</Link>
                  <Link href="/contact" onClick={toggleMenu} className="block py-2 px-4 text-sm text-black hover:bg-gray-700">Contact</Link>
                  {/* Add more links as needed */}
                </div>
              )}
            </>
          ) : (
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
