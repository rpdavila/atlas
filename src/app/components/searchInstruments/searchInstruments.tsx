"use client";
//react import
import { useMemo } from "react";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
// types
import { RentStatus } from "@prisma/client";
//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import SchoolSelectForm from "../forms/schoolSelectForm";


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
    displayInstruments,
    schools
  }: {
    displayInstruments: InstrumentList;
    schools: { id: string; name: string; }[];
  }) {
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const instrumentSearchResults = useMemo(() => {
    if (!displayInstruments || !searchField.trim()) {
      return displayInstruments || []
    }

    const searchTerm = searchField.toLowerCase();

    return displayInstruments.filter((instrument: Instrument) => {
      if (!instrument) return false;

      const searchableFields = [
        instrument.classification,
        instrument.brand,
        instrument.serialNumber,
        instrument.rentStatus,
        instrument.school?.name,
        instrument.instrumentAssignment?.student?.firstName,
        instrument.instrumentAssignment?.student?.lastName,
        instrument.instrumentAssignment?.student?.studentIdNumber
      ];

      return searchableFields.some(field =>
        field?.toLowerCase().includes(searchTerm)
      );
    });
  }, [displayInstruments, searchField]);

  return (
    <section className="flex flex-col gap-2 sm:ml-0 sm:min-h-screen">
      <section className="flex flex-col gap-2 w-full md:hidden">
        <InstrumentSearchForm />
        <SchoolSelectForm schools={schools} />
      </section>
      <section className="w-full md:mt-2">
        <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
      </section>
    </section>
  );
}