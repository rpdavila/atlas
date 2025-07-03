import { useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { RentStatus } from "@prisma/client";
import { useAppSelector } from "@/lib/ReduxSSR/hooks";

type DistrictInstrument = {
  school: {
    name: string;
  };
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
} | undefined

type DistrictInstruments = Array<DistrictInstrument>
export default function DistrictCard({ districtInstrumentSearchResults }: { districtInstrumentSearchResults: DistrictInstruments }) {
  // Get the schools that the user is associated with from the Redux store
  // This is used to filter out instruments that are not associated with the user's schools
  const userSchools = useAppSelector(state => state.userInfo.schools);

  const filteredSchools = useMemo(() =>
    districtInstrumentSearchResults.filter(school =>
      !userSchools.some(userSchool => userSchool.name === school?.school.name)
    ),
    [districtInstrumentSearchResults, userSchools]
  );

  if (filteredSchools.length === 0) {
    return <p>No instruments available from other schools</p>;
  }

  return (
    // Map through the districtInstrumentSearchResults and create a card for each instrument
    <>
      {filteredSchools.map((instrument) => (
        <Card key={instrument?.id} className="m-2 sm:hidden">
          <CardBody>
            <h3 className="text-lg font-semibold">{instrument?.classification}</h3>
            <p>Brand: {instrument?.brand}</p>
            <p>Serial Number: {instrument?.serialNumber}</p>
            <p>School: {instrument?.school.name}</p>
            <p>Status: {instrument?.rentStatus}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
}