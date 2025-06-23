import { RentStatus } from "@prisma/client";
import DistrictTable from "../table/instrumentTable";
import DistrictCard from "../cards/districtCard";

type DistrictInstrument = {
  school: {
    name: string;
  };
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
} | undefined

type DistrictInstruments = Array<DistrictInstrument>
export default function DistrictInstrumentCardList({
  districtInstrumentSearchResults
}: {
  districtInstrumentSearchResults: DistrictInstruments
}) {

  if (districtInstrumentSearchResults.length) {
    return (
      <>
        <DistrictTable districtInstrumentSearchResults={districtInstrumentSearchResults} />
        <DistrictCard districtInstrumentSearchResults={districtInstrumentSearchResults}/>
      </>
    )
  }
}