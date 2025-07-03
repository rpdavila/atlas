"use client";
//react import
import { useMemo, useEffect } from "react";
// next import
import { redirect } from "next/navigation";
//redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
import { setSchools } from "@/lib/ReduxSSR/features/userSlice";
// types
import { RentStatus } from "@prisma/client";
//component imports
import InstrumentCardList from "@/app/components/card-list/instrumentCardList";
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import SchoolSelectForm from "../forms/schoolSelectForm";
// session
import { useSession } from "next-auth/react";
// server actions
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

export default function SearchInstrument(
  {
    displayInstruments
  }: {
    displayInstruments: InstrumentList;
  }) {
  const session = useSession()
  const dispatch = useAppDispatch();
  // grab searchfield
  const searchField = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );
  const schoolList = useAppSelector((state: RootState) => state.userInfo.schools);


  // if no instruments are passed, return empty array
  const instrumentSearchResults = useMemo(() => {
    if (!displayInstruments || !searchField.trim()) {
      return displayInstruments || []
    }

    const searchTerm = searchField.toLowerCase();

    // TODO: Implement a more efficient search algorithm or create a normalized search index
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
    async function getSchools() {
      const userId = session.data?.user?.id
      if (!userId) redirect("/signIn")
      try {
        const schools = await getSchoolsByUserId(userId);
        return schools
      } catch (error) {
        console.warn("User not authenticated", error)

      }

    }
    getSchools().then((schools) => {
      dispatch(setSchools({ schools: schools }));
    });
  }, [session.data?.user?.id, dispatch])

  return (
    <section className="flex flex-col gap-2 sm:ml-0 sm:min-h-screen">
      <section className="flex flex-col gap-2 w-full md:hidden">
        <InstrumentSearchForm />
        <SchoolSelectForm schools={schoolList} />
      </section>
      <section className="w-full md:mt-2">
        <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
      </section>
    </section>
  );
}