"use client";
// react imports
import React, { useState } from "react";

//next imports
import { usePathname, useRouter } from "next/navigation";

//redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { logOutUser } from "@/lib/ReduxSSR/features/userSlice";
import { setType } from "@/lib/ReduxSSR/features/searchOptionsSlice";
//nextui components
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  NavbarBrand,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu
} from "@nextui-org/react";

//nav lists
import { navList, dashBoardNavList } from "@/app/data/nav-List";
import { tools } from "@/app/data/tools";

export default function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  const pathName = usePathname();
  const router = useRouter();


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickSignIn = () => {
    if (isLoggedIn) {
      dispatch(logOutUser());
      router.push("/");
    } else {
      router.push("/signIn");
    }
  };

  const handleChange = (key: React.Key) => {
    const value = key.toString()
    dispatch(setType(value));
    if (value === "Search Student") router.push("/dashboard/searchStudent");
    if (value === "Search Instrument") router.push("/dashboard/searchInstrument");
    if (value === "Add Student") router.push("/dashboard/studentForm");
    if (value === "Add Instrument") router.push("/dashboard/instrumentForm");
  }

  return (
    <header className=" bg-white w-auto">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "close menu" : "open menu"}
            className="md:hidden"
          />
          <NavbarBrand>
            {/* add logo here */}
          </NavbarBrand>

        </NavbarContent>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {
            isLoggedIn ? (
              dashBoardNavList.map((items, index) => (
                <NavbarItem key={index}>
                  <Link
                    className={pathName === items.href ? "active" : ""}
                    href={items.href}
                  >
                    {items.name}
                  </Link>
                </NavbarItem>
              ))
            ) : (
              navList.map((item, index) => (
                <NavbarItem key={`${item}-${index}`}>
                  <Link
                    className={pathName === item.href ? "active" : ""}
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
        <NavbarContent className={isLoggedIn ? "md:hidden" : "hidden"} justify="center">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Tools</Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={handleChange}
              >
                {tools.map((items, index) => (
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
        {isLoggedIn ? (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button className="hover:bg-sky-700 hover:text-white" onClick={handleClickSignIn} color="primary" href="./register" variant="flat">
                Sign Out
              </Button>
            </NavbarItem>
          </NavbarContent>

        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
              <Link href="/signIn">Sign In</Link>
            </NavbarItem>
            <NavbarItem>
              <Button className="hover:bg-sky-700 hover:text-white" as={Link} color="primary" href="./register" variant="flat">
                Register
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        <NavbarMenu>
          {isLoggedIn ? (
            dashBoardNavList.map((items, index) => {
              return (
                <NavbarMenuItem key={index}>
                  <Link href={items.href}>
                    {items.name}
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
                href="./signIn"
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
