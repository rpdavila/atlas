"use client";
// react imports
import { useEffect, useRef } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";

//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import { InstrumentList, InstrumentDetails } from "@/app/types/formTypes";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";


export default function SearchInstrument() {
  const dispatch = useAppDispatch()
  let instrumentSearchResults: InstrumentList = [];

  // Grab instrument list in store
  const displayInstruments: InstrumentList = useAppSelector(
    (state: RootState) => state.instruments.instrumentList
  );
  // check if instruments are loading
  const instrumentsLoading = useAppSelector(state => state.instruments.loading);
  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  // used to refresh component when search option changes
  const searchOption = useAppSelector(state => state.searchOptions.type)
  if (displayInstruments) {
    instrumentSearchResults = displayInstruments.filter((instrument: InstrumentDetails) => {
      return (
        instrument.classification?.includes(searchField) ||
        instrument.brand?.includes(searchField) ||
        instrument.serialNumber?.includes(searchField) ||
        instrument.rentStatus.includes(searchField)
      );
    });
  }

  useEffect(() => {
    dispatch(getInstruments())
  }, [dispatch])

  return (
    <section className="flex flex-col basis-3/4 items-center">
      {instrumentsLoading ? <h1>Loading...</h1> : <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />}
    </section>
  );
}