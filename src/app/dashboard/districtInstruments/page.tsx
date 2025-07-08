// react imports
import { Suspense } from "react";
// type imports
import { getInstrumentsByDistrict } from "@/actions/actions";
//auth imports
import { auth } from "@/auth";
//next imports
import { permanentRedirect } from "next/navigation"
// component imports
import SearchDistrictInstruments from "@/app/components/searchDistrictInstruments/searchDistrictInstruments";

export default async function DistrictInstruments() {
  const session = await auth()
  //redirect to signIn page if user is not signed in
  if (!session?.user) permanentRedirect("signIn")
  return (
    <SearchDistrictInstruments/>
  )
}
