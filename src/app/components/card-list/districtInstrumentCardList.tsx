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
}

type DistrictInstruments = DistrictInstrument[];
export default function DistrictInstrumentCardList({
  districtInstrumentSearchResults
}: {
  districtInstrumentSearchResults: DistrictInstruments
}) {

  if (!districtInstrumentSearchResults.length) {
    return (
      <div className="text-center text-gray-500">
        <p>No instruments found</p>
        <p className="text-sm">Try adjusting your search criteria </p>
      </div>
    )
  }
  return (
    <>
      <DistrictTable districtInstrumentSearchResults={districtInstrumentSearchResults} />
      <DistrictCard districtInstrumentSearchResults={districtInstrumentSearchResults} />
    </>
  )
}