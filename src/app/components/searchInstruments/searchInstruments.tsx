"use client";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
//type imports
import { InstrumentWithoutUserId, InstrumentListWithoutUserId, DistrictInstrumentsWithouUserId, DistrictList } from "@/app/types/formTypes";
//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import InstrumentSearchForm from "../forms/instrumentSearchForm";


export default function SearchInstrument(
  {
    displayInstruments
  }: {
    displayInstruments: InstrumentListWithoutUserId;
  }) {

  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );


  let instrumentSearchResults: InstrumentListWithoutUserId = [];

  if (!!displayInstruments) {

    instrumentSearchResults = displayInstruments.filter((instrument: InstrumentWithoutUserId) => {
      return (
        instrument.classification?.includes(searchField) ||
        instrument.brand?.includes(searchField) ||
        instrument.serialNumber?.includes(searchField) ||
        instrument.rentStatus?.includes(searchField)
      );
    });
  }

  return (
    <section className={`flex flex-col basis-3/4 items-center gap-2 sm:ml-0`}>
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
      </section>
      <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
    </section>
  );
}