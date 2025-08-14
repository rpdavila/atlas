import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InstrumentForm from "@/app/components/forms/instrumentForm";
import { getSchoolsByUserId } from "@/actions/actions";
export default async function InstrumentFormMobilePage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  
  const schools = await getSchoolsByUserId(session.user.id as string) 
  return (
    <>
      <InstrumentForm formTitle="Add Instrument" schools={schools}/>
    </>
  )
}