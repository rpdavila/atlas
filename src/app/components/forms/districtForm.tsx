//react
import { useEffect } from "react";
//components
import { Checkbox } from "@heroui/react"
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
    const value = e.target.checked
    dispatch(setDistrictSearch(value))
    if (value) {
      router.push("/dashboard/districtInstruments")
    } else {
      router.push("/dashboard/searchInstrument")
    }
  }

  useEffect(() => {
    async function getDistrict() {
      const userId = session.data?.user?.id;
      if (!userId) return;
      try {
        const data = await getDistrictFromUserId(userId)
        return data
      } catch (error) {
        console.error(error)
        return null
      }

    }
    if (!districtName) {
      getDistrict()
        .then(data => {
          if (data?.profile?.district?.name) {
            dispatch(setDistrict({ name: data.profile.district.name }))
          }
        })
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