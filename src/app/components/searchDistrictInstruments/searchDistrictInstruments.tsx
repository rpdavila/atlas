"use client";
//types
import { DistrictInstrumentsWithouUserId, DistrictList } from "@/app/types/formTypes"
import { RootState } from "@/lib/ReduxSSR/store";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks"
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import DistrictInstrumentCardList from "../card-list/districtInstrumentCardList";
export default function SearchDistrictInstruments(
  {
    displayInstruments
  }:
    {
      displayInstruments: DistrictList
    }) {

  // grab search field from redux
  const searchField = useAppSelector((state: RootState) => state.searchOptions.search)
  let instrumentSearchResults: DistrictList = []
  // get user search params
  if (!!displayInstruments) {
    instrumentSearchResults = displayInstruments.filter((instrument: DistrictInstrumentsWithouUserId) => {
      return (
        instrument.classification.includes(searchField) ||
        instrument.brand?.includes(searchField) ||
        instrument.serialNumber?.includes(searchField) ||
        instrument.school?.name.includes(searchField)
      )
    })
  }
  return (
    <section className={`flex flex-col basis-3/4 w-full items-center p-2 gap-2`}>
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
      </section>
      <DistrictInstrumentCardList districtInstrumentSearchResults={instrumentSearchResults} />
    </section>
  )
}