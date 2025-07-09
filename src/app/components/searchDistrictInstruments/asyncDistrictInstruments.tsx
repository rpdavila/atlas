import { auth } from "@/auth";
import {getInstrumentsByDistrict} from "@/actions/actions";
import SearchDistrictInstruments from "@/app/components/searchDistrictInstruments/searchDistrictInstruments";
import { redirect } from "next/navigation";
export default async function AsyncDistrictInstruments() {
  const session = await auth()
  if (!session?.user?.id) redirect("/signIn");
  const districtData = await getInstrumentsByDistrict(session?.user?.id)
  if (districtData?.length) {
    const displayInstruments = districtData;
    return (
      <SearchDistrictInstruments displayInstruments={displayInstruments} />
    )
  } else {
    return <div className="text-center">No instruments found for your district</div>
  }
}