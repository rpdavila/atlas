//type imports
import { InstrumentList } from "@/app/types/formTypes"
//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
import { useStudentList } from "@/app/hooks/useStudentList";
//redux imports 


type InstrumentCardListProps = {
  instrumentSearchResults: InstrumentList;
}

export default function InstrumentCardList({
  instrumentSearchResults,

}: InstrumentCardListProps) {
  const { studentDropDownList, hasMore, isLoading, onLoadMore } = useStudentList()
  //render the instrument cards
  return (
    <>
      {instrumentSearchResults.map((items) => {

        return <InstrumentCard
          key={items.id} instrument={items}
          studentDropDownList={studentDropDownList}
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
        />
      })}
    </>
  )
}