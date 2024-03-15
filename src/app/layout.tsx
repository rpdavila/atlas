import React, { Suspense } from "react";
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Providers } from "@/app/redux/provider";

import PersistGateWrapper from "./components/persist/persist";
import Header from "./components/header/header";
import Loading from "./components/loading/loading";

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <PersistGateWrapper>
            <Header />
            <Suspense fallback={<Loading />}>
              <main className="min-h-screen bg-white flex justify-center">
                {children}
              </main>
            </Suspense>
          </PersistGateWrapper>
        </Providers>
      </body>
    </html>
  );
}
