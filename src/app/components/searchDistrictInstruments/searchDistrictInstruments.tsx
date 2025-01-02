"use client";
//types

import { RootState } from "@/lib/ReduxSSR/store";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks"
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import DistrictInstrumentCardList from "../card-list/districtInstrumentCardList";
import { RentStatus } from "@prisma/client";
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


export default function SearchDistrictInstruments(
  {
    displayInstruments
  }:
    {
      displayInstruments: DistrictInstruments
    }) {

  // grab search field from redux
  const searchField = useAppSelector((state: RootState) => state.searchOptions.search)
  let instrumentSearchResults: DistrictInstruments = []
  // get user search params
  if (!!displayInstruments) {
    instrumentSearchResults = displayInstruments.filter((instrument: DistrictInstrument) => {
      return (
        instrument?.classification.includes(searchField) ||
        instrument?.brand?.includes(searchField) ||
        instrument?.serialNumber?.includes(searchField) ||
        instrument?.school?.name.includes(searchField)
      )
    })
  }
  return (
    <section className={`flex flex-col basis-3/4 w-full items-center p-2 gap-2 h-svh`}>
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
      </section>
      <DistrictInstrumentCardList districtInstrumentSearchResults={instrumentSearchResults} />
    </section>
  )
}