//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";

//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import { InstrumentList, InstrumentDetails } from "@/app/types/formTypes";

export default function SearchInstrument(
  {
    displayInstruments
  }: {
    displayInstruments: InstrumentList
  }) {

  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );
  let instrumentSearchResults: InstrumentList = [];

  if (!!displayInstruments) {

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
    <section className="flex flex-col basis-3/4 items-center m-2">
      <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
    </section>
  );
}