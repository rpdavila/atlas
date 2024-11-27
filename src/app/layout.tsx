import React from "react";
import "./globals.css";
import type { Metadata } from "next";


import { Inter } from "next/font/google";

import { Providers } from "@/app/redux/provider";
import Header from "./components/header/header";
import { NextAuthProvider } from "./nextAuthProvider/nextAuthProvider";
import { Link } from "@nextui-org/react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrescendoSync Systems",
  description: "Innovative Music Inventory Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <Providers>
            <Header />
            <main className="flex flex-col justify-center flex-1 px-4 sm:px-6 lg:px-8 text-center bg-slate-700">

              {children}

              <footer className="flex items-center justify-center w-full h-24 border-t mt-8">
                <Link href="/" target="_blank" rel="noopener noreferrer">
                  Powered by Crescendo Cloud
                </Link>
              </footer>
            </main>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
