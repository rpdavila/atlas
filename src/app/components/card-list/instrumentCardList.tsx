import { Suspense } from "react";
// redux imports
import { useAppSelector } from "@/app/lib/ReduxSSR/hooks";
//type imports
import { InstrumentList } from "@/app/types/formTypes"
//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard" 
import Loading from "../loading/loading";

type InstrumentCardListProps = {
  instrumentSearchResults?: InstrumentList;
}

export default function InstrumentCardListSuspenseWrapper({ instrumentSearchResults}: InstrumentCardListProps) {
  
  return(
    <Suspense fallback={<Loading/>}>
      <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
    </Suspense>
  )
}

function InstrumentCardList({
  instrumentSearchResults
}: InstrumentCardListProps) {
  return ( 
    <>
      {instrumentSearchResults?.map((items) => {
          return <InstrumentCard key={items._id} instrument={items} />
        })}
    </>
  )
}