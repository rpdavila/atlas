
// type imports
import { InstrumentList, StudentList } from "@/app/types/formTypes";

//compnent imports
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments"

// actions imports
import { getInstruments } from "@/actions/actions";

export default async function InstrumentPage() {
  const displayInstruments: InstrumentList = await getInstruments();
  
  return (
    <SearchInstrument displayInstruments={displayInstruments} />      
  )
}