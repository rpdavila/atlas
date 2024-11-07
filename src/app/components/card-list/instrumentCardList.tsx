//type imports
import {
  InstrumentListWithoutUserId,
  InstrumentWithoutUserId,
} from "@/app/types/formTypes"

//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
// redux
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

type InstrumentCardListProps = {
  instrumentSearchResults: InstrumentListWithoutUserId;
}

export default function InstrumentCardList({
  instrumentSearchResults

}: InstrumentCardListProps) {
  const dropDownList = useAppSelector(state => state.students.dropDownList)
  const schoolName = useAppSelector(state => state.searchOptions.school)

  // filter the data based on parameters
  const filteredSChools = instrumentSearchResults.filter(school => school.school?.name === schoolName)
  const filteredDropDownList = dropDownList.filter(student => student.school?.name === schoolName)

  //render the instrument cards
  return (
    <section className={`${filteredSChools.length > 4 ? "h-full" : "h-screen"} w-full`}>
      {filteredSChools.map((items: InstrumentWithoutUserId) => {
        return (
          <InstrumentCard
            key={items.id}
            instrument={items}
            studentDropDownList={filteredDropDownList}
          />)
      })}
    </section>
  )
}

