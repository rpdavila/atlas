"use client";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
// types
import { RentStatus } from "@prisma/client";
//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import InstrumentSearchForm from "../forms/instrumentSearchForm";

type Instrument = {
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
  instrumentAssignment: {
    id: string;
    student: {
      id: string;
      firstName: string;
      lastName: string;
      studentIdNumber: string;
    };
  } | null;
  school: {
    name: string;
  };
} | undefined

type InstrumentList = Instrument[]

export default function SearchInstrument(
  {
    displayInstruments
  }: {
    displayInstruments: InstrumentList;
  }) {

  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );


  let instrumentSearchResults: InstrumentList = [];

  if (!!displayInstruments) {

    instrumentSearchResults = displayInstruments.filter((instrument: Instrument) => {
      return (
        instrument?.classification?.includes(searchField) ||
        instrument?.brand?.includes(searchField) ||
        instrument?.serialNumber?.includes(searchField) ||
        instrument?.rentStatus?.includes(searchField)
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