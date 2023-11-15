"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navList } from "@/app/data/nav-List";
import Button from "../button/button";

export default function Header() {
  const pathName = usePathname();

  return (
    <header>
      <nav className="flex justify-end bg-white h-20">
        <ul className="flex flex-row items-center">
          {navList.map((items, index) => {
            return (
              <li key={index} className="p-2">
                <Link
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
          {/* <Button type="button" width="auto" name="Sign In" /> */}
        </ul>
      </nav>
    </header>
  );
}
