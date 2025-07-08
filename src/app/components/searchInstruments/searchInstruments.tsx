"use client";
//react import
import { useMemo, useEffect, useState } from "react";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
// types
import { RentStatus } from "@prisma/client";
//auth imports
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import SchoolSelectForm from "../forms/schoolSelectForm";
import Loading from "../loading/loading";
// action imports
import { getInstrumentsByUserId } from "@/actions/actions";
import { getSchoolsByUserId } from "@/actions/actions";



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

type Schools = {
  id: string;
  name: string;
}[]
export default function SearchInstrument() {
  const session = useSession();
  if (!session.data?.user?.id) {
    redirect("/signIn");
  }
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [displayInstruments, setDisplayInstruments] = useState<InstrumentList | null>(null);
  const [schools, setSchools] = useState<Schools>([]);
  const instrumentSearchResults = useMemo(() => {
    if (!displayInstruments || !searchField.trim()) {
      return displayInstruments || []
    }
    // Convert search field to lowercase for case-insensitive search
    const searchTerm = searchField.toLowerCase();
    // Filter instruments based on the search term
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

  useEffect(() => {
    const getInstruments = async () => {
      setLoading(true);
      try {
        const instrumentData = await getInstrumentsByUserId(session.data?.user?.id as string);
        if (Array.isArray(instrumentData)) {
          setDisplayInstruments(instrumentData);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching instruments:", error);
      }
    }

    const getSchools = async () => {
      try {
        setLoading(true);

        const schools = await getSchoolsByUserId(session.data?.user?.id as string);
        if (Array.isArray(schools)) {
          setSchools(schools);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    }

    getInstruments();
    getSchools();
  }, [session.data?.user?.id]);

  return (
    <>
      {loading ? (<Loading />) : (<section className="flex flex-col gap-2 sm:ml-0 sm:min-h-screen">
        <section className="flex flex-col gap-2 w-full md:hidden">
          <InstrumentSearchForm />
          <SchoolSelectForm schools={schools} />
        </section >
        <section className="w-full md:mt-2">
          <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
        </section>
      </section >)
      }
    </>

  );
}