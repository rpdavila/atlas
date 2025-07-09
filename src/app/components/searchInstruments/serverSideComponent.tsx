// actions imports
import { getInstrumentsByUserId } from "@/actions/actions";
// component imports
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments";
//auth imports
import { auth } from "@/auth";
// next imports
import { redirect } from "next/navigation";

export default async function AsyncServerCompnent() {
  const session = await auth();
  // redirect to signIn page if user is not signed in
  if (!session?.user) {
    redirect("/signIn");
  }
  // fetch instruments by user id
  const instrumentData = await getInstrumentsByUserId(session.user.id as string);

  if (Array.isArray(instrumentData)) {
    return <SearchInstrument displayInstruments={instrumentData} />;
  } else {
    return (
      <div className="flex justify-center h-screen text-slate-50 w-full">
        <h1 className="flex self-center text-8xl"> No instruments found</h1>
      </div>
    )
  }
}