//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";

//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import { InstrumentList, InstrumentDetails } from "@/app/types/formTypes";
import InstrumentSearchForm from "../forms/instrumentSearchFrom";


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
    <section className="flex flex-col basis-3/4 items-center mt-2 mr-2 gap-2 ml-2 sm:ml-0">
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
      </section>
      <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />


    </section>
  );
}