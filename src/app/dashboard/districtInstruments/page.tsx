// react imports
import { Suspense } from "react";
//auth imports
import { auth } from "@/auth";
//next imports
import { redirect } from "next/navigation"
// component imports
import Loading from "@/app/components/loading/loading";
import AsyncDistrictInstruments from "@/app/components/searchDistrictInstruments/asyncDistrictInstruments";

export default async function DistrictInstruments() {
  const session = await auth()
  //redirect to signIn page if user is not signed in
  if (!session?.user) redirect("signIn")

  return (
    <Suspense fallback={<Loading />}>
      <AsyncDistrictInstruments />
    </Suspense>
  )
}
