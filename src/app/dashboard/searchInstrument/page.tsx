// react imports
import { Suspense } from "react";
// auth import 
import { auth } from "@/auth"
//component imports
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments"
import Loading from "@/app/components/loading/loading";
// actions imports
import { permanentRedirect } from "next/navigation";

export default async function SearchInstrumentPage() {
  const session = await auth()
  if (!session?.user) {
    permanentRedirect("signIn")
  };
  return <SearchInstrument />
} 
