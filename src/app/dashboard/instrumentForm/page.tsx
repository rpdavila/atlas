import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InstrumentForm from "@/app/components/forms/instrumentForm";
import { getSchoolsByUserId } from "@/actions/actions";

export default async function InstrumentFormPageMobile() {
  // Authenticate the user
  // This will check the session and return it
  const session = await auth();
  // Check if the session is unauthenticated
  // If so, redirect to the sign-in page
  // This is a server-side check, so we can use `redirect` directly
  if (!session?.user?.id) {
    redirect("/signIn");
  }

  // Fetch the schools associated with the user
  const schools = await getSchoolsByUserId(session.user.id);
  return (
    <div className="flex justify-center items-center h-full sm:hidden">
      <InstrumentForm formTitle="Add Instrument" schools={schools} />
    </div>
  );
}