import { DistrictList, DistrictInstrumentsWithouUserId } from "@/app/types/formTypes";
import DistrictTable from "../table/instrumentTable";
export default function DistrictInstrumentCardList({
    districtInstrumentSearchResults
  }:{
      districtInstrumentSearchResults: DistrictList
    }) {
    
    if (districtInstrumentSearchResults.length){
      return (
        <DistrictTable districtInstrumentSearchResults={districtInstrumentSearchResults} />
      )
    }  

  
}