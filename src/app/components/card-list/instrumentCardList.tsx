import { Suspense } from "react";
//type imports
import { InstrumentList } from "@/app/types/formTypes"
//component imports
import InstrumentCard from "@/app/components/cards/instrumentCard"
//redux imports 
import { useAppSelector } from "@/app/lib/ReduxSSR/hooks";
// type imports
import Loading from "@/app/components/loading/loading";

type InstrumentCardListProps = {
  instrumentSearchResults?: InstrumentList;
}

export default function InstrumentCardListSuspenseWrapper({ instrumentSearchResults}: InstrumentCardListProps) {
  return(    
    <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />    
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