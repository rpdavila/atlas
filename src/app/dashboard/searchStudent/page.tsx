// react imports
import { Suspense } from "react";
// sever actions
import { getStudentsByUserId } from "@/actions/actions";
// components
import Loading from "@/app/components/loading/loading";
import SearchStudent from "@/app/components/searchStudent/searchStudent";
// auth
import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";


export default async function StudentPage() {
  const session = await auth();

  if (!session?.user) {
    permanentRedirect("/signIn")
  };

  return (
    <Suspense fallback={<Loading />}>
      <SearchStudent />
    </Suspense>
  )
}
