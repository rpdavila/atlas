import { Suspense } from "react";
//type imports
import { InstrumentList } from "@/app/types/formTypes"
//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
//redux imports 


type InstrumentCardListProps = {
  instrumentSearchResults: InstrumentList;
}

export default function InstrumentCardList({
  instrumentSearchResults
}: InstrumentCardListProps) {
  return (
    <>
      {instrumentSearchResults.map((items) => {
        return <InstrumentCard key={items._id} instrument={items} />
      })}
    </>
  )
}