"use client";
// react imports
import { Suspense, use, useEffect } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";

//component imports
import InstrumentCardListSuspenseWrapper from "@/app/components/card-list/instrumentCardList";
import { InstrumentDetails } from "@/app/types/formTypes";
import { getInstruments } from "@/app/lib/ReduxSSR/features/instrumentSLice";


export default function SearchInstrument() {
  const dispatch = useAppDispatch();

  // Grab instrument list in store
  const displayInstruments = useAppSelector(
    (state: RootState) => state.instruments
  );

  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const instrumentSearchResults = displayInstruments.instrumentList?.filter((instrument: InstrumentDetails) => {
    return (
      instrument.classification?.includes(searchField) ||
      instrument.brand?.includes(searchField) ||
      instrument.serialNumber?.includes(searchField) ||
      instrument.rentStatus.includes(searchField)
    );
  });

  useEffect(() => {
    if (typeof displayInstruments.instrumentList === "undefined" || displayInstruments.instrumentList.length === 0) {
      dispatch(getInstruments())
    }
  }, [dispatch, displayInstruments])

  return (
    <section className="flex flex-col basis-3/4 items-center">
      <InstrumentCardListSuspenseWrapper instrumentSearchResults={instrumentSearchResults} />
    </section>
  );
}