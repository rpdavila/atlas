import React, { Suspense } from "react";
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Providers } from "@/app/redux/provider";

import config from "../aws-exports";
import Header from "./components/header/header";
import SideBar from "./components/sideBar/sideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Inventory Solutions",
  description: "Manage your music classroom inventory more efficiantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="flex flex-row gap-2 bg-slate-700">
            <SideBar />
            <Suspense fallback={<p>Loading Page...</p>}>{children}</Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
