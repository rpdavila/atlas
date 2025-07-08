"use client";
// react imports
import { useMemo, useEffect, useState } from "react";
//types
import { RootState } from "@/lib/ReduxSSR/store";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks"
import InstrumentSearchForm from "../forms/instrumentSearchForm";
import DistrictInstrumentCardList from "../card-list/districtInstrumentCardList";
import { RentStatus } from "@prisma/client";
// action imports
import { getInstrumentsByDistrict } from "@/actions/actions";
// auth imports
import { useSession } from "next-auth/react";
// next imports
import { redirect } from "next/navigation";
import Loading from "../loading/loading";

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


export default function SearchDistrictInstruments() {
  const session = useSession();
  const searchField = useAppSelector((state: RootState) => state.searchOptions.search)
  const [displayInstruments, setDisplayInstruments] = useState<DistrictInstruments | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!session.data?.user?.id) {
    redirect("/signIn");
  }
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

  useEffect(() => {
    const getDistrictInstruments = async () => {
      setLoading(true);
      try {
        if (!session.data.user?.id) return;
        const districtData = await getInstrumentsByDistrict(session.data.user.id)
        if (districtData?.length) {
          setDisplayInstruments(districtData);
        }
        setLoading(false);

      } catch (error) {
        setLoading(false);
        console.error("Error fetching district instruments:", error);
      }
    }
    getDistrictInstruments();

  }, [session.data?.user?.id]);
  return (
    <section className={`flex flex-col basis-3/4 w-full items-center p-2 gap-2 h-svh`}>
      <section className="w-full md:hidden">
        <InstrumentSearchForm />
      </section>
      {loading ? (
        <Loading />
      ) : (
        <DistrictInstrumentCardList districtInstrumentSearchResults={instrumentSearchResults} />
      )}

    </section>
  )
}