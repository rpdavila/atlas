"use client";
// react imports
import { useEffect, useRef } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";

//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import { InstrumentList, InstrumentDetails } from "@/app/types/formTypes";
import { useMongoDbDataAccess } from "@/app/hooks/useMongoDbDataAccess";
import Loading from "../loading/loading";

export default function SearchInstrument() {
  let instrumentSearchResults: InstrumentList = [];
  const { data, loading, error } = useMongoDbDataAccess({ collectionName: 'instrumentInfo' });
  // Grab instrument list in store
  const displayInstruments: InstrumentList = useAppSelector(
    (state: RootState) => state.instruments.instrumentList
  );
  // // check if instruments are loading
  // const instrumentsLoading = useAppSelector(state => state.instruments.loading);
  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  if (data) {
    instrumentSearchResults = data.filter((instrument: InstrumentDetails) => {
      return (
        instrument.classification?.includes(searchField) ||
        instrument.brand?.includes(searchField) ||
        instrument.serialNumber?.includes(searchField) ||
        instrument.rentStatus.includes(searchField)
      );
    });
  }

  if (error) {
    return (
      <>
        <h1 >Error: {error.message}</h1>
      </>
    );
  }

  return (
    <section className="flex flex-col basis-3/4 items-center">
      {loading ? <Loading /> : <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />}
    </section>
  );
}