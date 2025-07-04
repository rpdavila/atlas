// react imports
import { Suspense } from "react";
// type imports
import { getInstrumentsByDistrict } from "@/actions/actions";
//auth imports
import { auth } from "@/auth";
//next imports
import { permanentRedirect } from "next/navigation"
// component imports
import Loading from "@/app/components/loading/loading";
import SearchDistrictInstruments from "@/app/components/searchDistrictInstruments/searchDistrictInstruments";

export default async function DistrictInstruments() {
  const session = await auth()
  //redirect to signIn page if user is not signed in
  if (!session?.user) permanentRedirect("signIn")

  const districtData = await getInstrumentsByDistrict(session?.user?.id as string)
  if (districtData?.length) {
    const displayInstruments = districtData;
    return (
      <Suspense fallback={<Loading />}>
        <SearchDistrictInstruments displayInstruments={displayInstruments} />
      </Suspense>
    )
  } else {
    return <div className="text-center">No instruments found for your district</div>
  }

}