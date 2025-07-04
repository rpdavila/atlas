import { getAvailableInstrumentCount, getAvailableInstrumentCountByDistrict } from "@/actions/actions";
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function UserDetail() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signIn");
  }

  const instrumentCountSchoolWide = await getAvailableInstrumentCount(session.user.id as string)
  const instrumentCountDistrict = await getAvailableInstrumentCountByDistrict(session.user.id as string)
  // Ensure the counts are numbers, defaulting to 0 if they are not
  // This is to handle cases where the counts might be undefined or null  
  const schoolCount = typeof instrumentCountSchoolWide === 'number' ? instrumentCountSchoolWide : 0;
  const districtCount = typeof instrumentCountDistrict === 'number' ? instrumentCountDistrict : 0;

  return (
    <section className="flex flex-col p-4 justify-evenly items-center text-2xl bg-white rounded-lg sm:basis-3/4 sm:flex- sm:flex-wrap">
      <h1>
        Hello, {session.user.name}
      </h1>
      <section className="flex flex-col gap-4">
        <p className="underline-offset-6 underline text-4xl">Number of instruments</p>
        <p>Number of instruments available school wide: {schoolCount}</p>
        <p>Number of instruments available district wide: {districtCount - schoolCount}</p>
      </section>
    </section>
  );
}
