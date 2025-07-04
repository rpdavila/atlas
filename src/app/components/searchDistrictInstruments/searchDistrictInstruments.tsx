"use client";

import { useMemo } from "react";
//types
import { RootState } from "@/lib/ReduxSSR/store";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks"
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import DistrictInstrumentCardList from "../card-list/districtInstrumentCardList";
import { RentStatus } from "@prisma/client";
type DistrictInstrument = {
  school: {
    name: string;
  };
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
}

type DistrictInstruments = DistrictInstrument[]


export default function SearchDistrictInstruments(
  {
    displayInstruments
  }:
    {
      displayInstruments: DistrictInstruments
    }) {

  const searchField = useAppSelector((state: RootState) => state.searchOptions.search)
  
  const instrumentSearchResults = useMemo(() => {
    if (!displayInstruments || !searchField.trim()) {
      return displayInstruments || [];
    }

    const searchTerm = searchField.toLowerCase();
    return displayInstruments.filter((instrument) => {
      return (
        instrument.classification.toLowerCase().includes(searchTerm) ||
        instrument.brand.toLowerCase().includes(searchTerm) ||
        instrument.serialNumber.toLowerCase().includes(searchTerm) ||
        instrument.school.name.toLowerCase().includes(searchTerm)
      )
    });
  }, [displayInstruments, searchField]);
  return (
    <section className={`flex flex-col basis-3/4 w-full items-center p-2 gap-2 h-svh`}>
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
      </section>
      <DistrictInstrumentCardList districtInstrumentSearchResults={instrumentSearchResults} />
    </section>
  )
}