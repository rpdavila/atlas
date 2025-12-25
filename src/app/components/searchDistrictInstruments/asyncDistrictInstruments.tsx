import {auth} from "@/auth";
import {getInstrumentsByDistrict} from "@/actions/actions";
import SearchDistrictInstruments from "@/app/components/searchDistrictInstruments/searchDistrictInstruments";
import {redirect} from "next/navigation";

export default async function AsyncDistrictInstruments() {
  const session = await auth()
  if (!session?.user?.id) redirect("/");
  const districtData = await getInstrumentsByDistrict(session?.user?.id)
  if (!districtData?.length) {
    return <div className="text-center">No instruments found for your district</div>
  }
  return (
    <SearchDistrictInstruments displayInstruments={districtData} />
  )
}