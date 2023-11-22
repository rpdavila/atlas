"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { setType } from "@/app/redux/features/searchOptionsSlice";

import { navList } from "@/app/data/nav-List";
import Button from "../button/button";

export default function Header() {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();

  const handleClickSignIn = () => {
    router.push("/signIn");
  };

  const handleClickNav = () => {
    dispatch(setType(""));
  };

  return (
    <header>
      <nav className="flex justify-end bg-white h-20">
        <ul className="flex flex-row items-center">
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
          <Button
            type="button"
            width="auto"
            name="Sign In"
            onClick={handleClickSignIn}
          />
        </ul>
      </nav>
    </header>
  );
}
