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

  const studentData = await getStudentsByUserId(session.user?.id as string);

  if (studentData?.length) {
    const displayStudents = studentData;
    return (
      <Suspense fallback={<Loading />}>
        <SearchStudent displayStudents={displayStudents} />
      </Suspense>
    )
  } else {
    return (
      <div className="flex justify-center items-center min-h-[60vh] w-full">
        <h1 className="text-2xl md:text-4xl text-slate-200 font-semibold">No students found</h1>
      </div>
    )
  }
}