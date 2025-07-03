// react
import { Suspense } from "react";

// loading
import Loading from "@/app/components/loading/loading";

//components
import Profile from "@/app/components/profile/profile";

// auth
import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";

export default async function UserProfile() {
  const session = await auth();
  
  if (!session?.user) {
    permanentRedirect("/signIn");
  }

  return (
    <section className="h-screen">
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    </section>
  )
}
