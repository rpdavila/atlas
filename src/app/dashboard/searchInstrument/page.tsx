import { Suspense } from "react";
// auth import 
import { auth } from "@/auth"
// component import
import Loading from "@/app/components/loading/loading";
import ServerSideComponent from "@/app/components/searchInstruments/serverSideComponent";
// next import
import { redirect } from "next/navigation";

export default async function SearchInstrumentPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/signIn")
  };

  return (
    <Suspense fallback={<Loading />}>
      <ServerSideComponent />
    </Suspense>
  )

}