//react
import { useEffect } from "react";
//components
import { Checkbox } from "@nextui-org/react"
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
// server actions
import { getDistrictFromUserId } from "@/actions/actions";
//redux 
import { setDistrict, } from "@/lib/ReduxSSR/features/userSlice"
import { setDistrictSearch } from "@/lib/ReduxSSR/features/searchOptionsSlice";
// session
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DistrictForm() {
  const dispatch = useAppDispatch();

  const districtName = useAppSelector(state => state.userInfo.district)
  const districtSearch = useAppSelector(state => state.searchOptions.district)
  const session = useSession();
  const router = useRouter()

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: boolean = e.target.checked
    setDistrictSearch(value)
    if (value) {
      router.push("/dashboard/districtInstruments")
    } else {
      router.push("/dashboard/searchInstrument")
    }
  }

  useEffect(() => {
    async function getDistrict() {
      const data = await getDistrictFromUserId(session.data?.user?.id as string)
      return data
    }
    if (!districtName) {
      getDistrict()
        .then(data => dispatch(setDistrict({ name: data?.profile?.district?.name as string })))

    }
  }, [dispatch, districtName, session.data?.user?.id])

  return (
    <>
      {districtName ? (
        <section className="flex flex-col items-start bg-slate-50 w-full rounded-lg">
          <span className="flex justify-center items-center bg-blue-500 text-slate-50 w-full rounded-t-lg">
            District Wide Search
          </span>
          <form className="flex items-start bg-slate-50 w-auto rounded-lg m-2 p-2">
            <Checkbox
              aria-label="District Wide Search"
              isSelected={districtSearch}
              onChange={handleCheckboxChange}
            >
              {districtName.name}
            </Checkbox>
          </form>
        </section>
      ) : (
        <span className="bg-slate-50 w-full rounded-lg m-2 p-2">
          No Data
        </span>
      )}
    </>
  )
}