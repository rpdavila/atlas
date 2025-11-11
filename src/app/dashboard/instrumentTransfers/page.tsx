import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";

export default async function InstrumentTransfers() {
  const session = await auth();
  
  if (!session?.user) {
    permanentRedirect("/");
  }

  return (
    <>
     {/* <InstrumentTransferList /> goes here */}
      Transfers go Here!
    </>
  )
}