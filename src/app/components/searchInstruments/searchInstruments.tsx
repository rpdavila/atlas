"use client";
//react import
import { useMemo, useEffect } from "react";
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
// sesiso
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

    return displayInstruments.filter((instrument: Instrument) => {
      if (!instrument) return false;
      return (
        instrument?.classification?.toLowerCase().includes(searchTerm) ||
        instrument?.brand?.toLowerCase().includes(searchTerm) ||
        instrument?.serialNumber?.toLowerCase().includes(searchTerm) ||
        instrument?.rentStatus?.toLowerCase() === searchTerm ||
        instrument?.school?.name?.toLowerCase().includes(searchTerm) ||
        instrument?.instrumentAssignment?.student?.firstName?.toLowerCase().includes(searchTerm) ||
        instrument?.instrumentAssignment?.student?.lastName?.toLowerCase().includes(searchTerm) ||
        instrument?.instrumentAssignment?.student?.studentIdNumber?.toLowerCase().includes(searchTerm)
      );
    });
  }, [displayInstruments, searchField]);

  useEffect(() => {
    async function getSchools() {
      const schools = await getSchoolsByUserId(session.data?.user?.id || "");
      return schools
    }
    getSchools().then((schools) => {
      dispatch(setSchools({ schools: schools }));
    });
  }, [session.data?.user?.id, dispatch])

  return (
    <section className={`flex flex-col mt-2 m-8 basis-3/4 items-center gap-2 sm:ml-0 sm:min-h-screen`}>
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
        <SchoolSelectForm schools={schoolList} />
      </section>
      <InstrumentCardList instrumentSearchResults={instrumentSearchResults} />
    </section>
  );
}