"use client";
// react imports
import React, { useState, useEffect } from "react";

//next imports
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

//redux imports
import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setType } from "@/lib/ReduxSSR/features/searchOptionsSlice";

//nextui components
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  NavbarBrand,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Link
} from "@heroui/react";
//nav lists
import { navList, dashBoardNavList } from "@/app/data/nav-List";
import { tools } from "@/app/data/tools";
//auth
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";

export default function Header() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (key: React.Key) => {
    const value = key.toString()
    dispatch(setType(value));
    if (value === "Search Student") router.push("/dashboard/searchStudent");
    if (value === "Search Instrument") router.push("/dashboard/searchInstrument");
    if (value === "Add Student") router.push("/dashboard/studentForm");
    if (value === "Add Instrument") router.push("/dashboard/instrumentForm");
    if (value === "Search District") router.push("/dashboard/districtInstruments");
  }
  useEffect(() => {
    if (pathName === "/dashboard") {
      dispatch(setType(""))
    }
  }, [dispatch, pathName])
  return (
    <header className=" bg-white w-full">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "close menu" : "open menu"}
            className="md:hidden"
          />
          <NavbarBrand className="flex flex-col">
            <Image src="/images/CrescendoCloudLogo.png" alt="Cescendo Cloud Logo" height={75} width={75}></Image>
          </NavbarBrand>

        </NavbarContent>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {
            session?.user ? (
              dashBoardNavList.map((item, index) => (
                <NavbarItem key={`${item}-${index}`}>
                  <Link
                    className={pathName === item.href ? "active" : ""}
                    href={item.href}
                    color={pathName === item.href ? "secondary" : "primary"}
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              ))
            ) : (
              navList.map((item, index) => (
                <NavbarItem key={`${item}-${index}`}>
                  <Link
                    className={pathName === item.href ? "active underline" : ""}
                    color={
                      pathName === item.href ? "secondary" : "primary"
                    }
                    href={item.href}
                    size="lg"
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              ))
            )
          }
        </NavbarContent>
        <NavbarContent className={session?.user ? "md:hidden" : "hidden"} justify="center">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Tools</Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={handleChange}
              >
                {tools.map((items) => (
                  <DropdownItem
                    key={items.key}
                  >
                    {items.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        {session?.user ? (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                className="hover:bg-sky-700 hover:text-white" color="primary" variant="flat"
                onPress={() => signOut({ callbackUrl: '/' })}
              >
                Sign Out
              </Button>
            </NavbarItem>
          </NavbarContent>

        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
              <Button
                className="hover:bg-sky-700 hover:text-white" color="primary" variant="flat"
                onPress={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                Sign In
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        <NavbarMenu>
          {session?.user ? (
            dashBoardNavList.map((item, index) => {
              return (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link href={item.href}>
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              )
            })
          ) : (
            <>
              {navList.map((item, index) => {
                return (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      color={
                        pathName === item.href ? "secondary" : "primary"
                      }
                      className="w-full"
                      href={item.href}
                      size="lg"
                    >
                      {item.name}
                    </Link>
                  </NavbarMenuItem>
                )
              })}
              <Link
                color="danger"
                href="/signIn"
              >
                Sign In
              </Link>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
