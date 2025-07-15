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
    return <p className="text-slate-200 text-center py-8">No instruments available from other schools</p>;
  }

  return (
    // Map through the districtInstrumentSearchResults and create a card for each instrument
    <>
      {filteredSchools.map((instrument) => (
        <Card key={instrument?.id} className="sm:hidden w-full shadow-md hover:shadow-lg transition-shadow bg-slate-100 border border-slate-600">
          <CardBody className="p-4">
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h3 className="text-lg font-semibold text-slate-600">
                  {instrument?.classification}
                </h3>
              </div>

              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-slate-600">Brand:</dt>
                  <dd className="text-sm text-slate-600">{instrument?.brand}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-slate-600">Serial Number:</dt>
                  <dd className="text-sm text-slate-600 font-mono">{instrument?.serialNumber}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-slate-600">School:</dt>
                  <dd className="text-sm text-slate-600">{instrument?.school.name}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-slate-600">Status:</dt>
                  <dd className="text-sm text-slate-600">{instrument?.rentStatus}</dd>
                </div>
              </dl>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}