import { getUserProfile } from "@/actions/actions";
import UserDetail from "../components/userDetail/userDetail";
import { auth } from "@/auth";
import NoProfile from "../components/noProfile/noProfile";
import { permanentRedirect } from "next/navigation";

export default async function DashBoardMainPage() {

  const session = await auth();
  if (!session?.user) {
    permanentRedirect("/signIn")
  }

  const profile = await getUserProfile(session.user.id as string)
  if (!profile?.profile) {
    return <NoProfile />
  }

  return (
    <section className="flex flex-col m-2 rounded-lg basis-3/4 h-full">
      <UserDetail />
    </section>
  );
}
