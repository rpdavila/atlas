import { getAvailableInstrumentCount, getAvailableInstrumentCountByDistrict } from "@/actions/actions";
import { auth } from "@/auth"

export default async function UserDetail() {
  const session = await auth();
  const instrumentCountSchoolWide = await getAvailableInstrumentCount(session?.user?.id as string)
  const instrumentCountDistrict = await getAvailableInstrumentCountByDistrict(session?.user?.id as string)

  return (
    <section className="flex flex-col justify-evenly items-center text-2xl bg-white rounded-lg basis-3/4 sm:flex- sm:flex-wrap">
      <h1>
        Hello, {session?.user?.name}
      </h1>
      <section className="flex flex-col gap-4">
        <p className="underline-offset-6 underline text-4xl">Number of instruments</p>
        <p>Number of instruments available school wide: {instrumentCountSchoolWide}</p>
        <p>Number of instruments available district wide: {instrumentCountDistrict - instrumentCountSchoolWide}</p>
      </section>
    </section>
  );
}
