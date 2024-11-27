// react
import { Suspense } from "react";

// loading
import Loading from "@/app/components/loading/loading";

//components
import Profile from "@/app/components/profile/profile";

export default function UserProfile() {

  return (
    <section className="h-screen">
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    </section>
  )
}
