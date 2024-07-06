//redux imports
import { useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { RootState } from "@/app/lib/ReduxSSR/store";


//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import { InstrumentList, InstrumentDetails } from "@/app/types/formTypes";

import Loading from "../loading/loading";

export default function SearchInstrument() {
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