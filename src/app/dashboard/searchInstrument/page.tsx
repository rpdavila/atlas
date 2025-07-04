// react imports
import { Suspense } from "react";
// auth import 
import { auth } from "@/auth"

//component imports
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments"
import Loading from "@/app/components/loading/loading";
// actions imports
import { getInstrumentsByUserId } from "@/actions/actions";
import { getSchoolsByUserId } from "@/actions/actions";
import { permanentRedirect } from "next/navigation";

export default async function SearchInstrumentPage() {
  const session = await auth()

  if (!session?.user) {
    permanentRedirect("signIn")
  };

  const instrumentData = await getInstrumentsByUserId(session.user.id as string);
  const schools = await getSchoolsByUserId(session.user.id as string);

  if (Array.isArray(instrumentData)) {
    return <SearchInstrument displayInstruments={instrumentData} schools={schools} />
  } else {
    return (
      <div className="flex justify-center h-screen text-slate-50 w-full">
        <h1 className="flex self-center text-8xl"> No instruments found</h1>
      </div>
    )
  }


}