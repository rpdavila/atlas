// react imports
import { useRef } from "react";

//redux imports
import { useAppSelector, useAppStore } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
import { getInstruments } from "@/lib/ReduxSSR/features/instrumentSLice";
import { getDropDownList } from "@/lib/ReduxSSR/features/studentListSlice"

//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import { InstrumentList, InstrumentDetails } from "@/app/types/formTypes";
import Loading from "../loading/loading";
import { UnknownAction } from "@reduxjs/toolkit";


export default function SearchInstrument() {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(getInstruments() as unknown as UnknownAction);
    store.dispatch(getDropDownList() as unknown as UnknownAction);
    initialized.current = true;
  }

  // Grab instrument list in store
  let instrumentSearchResults: InstrumentList = [];
  const displayInstruments = useAppSelector((state) => state.instruments.instrumentList)
  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );


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

  return (
    <section className="flex flex-col basis-3/4 items-center">
      <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
    </section>
  );
}