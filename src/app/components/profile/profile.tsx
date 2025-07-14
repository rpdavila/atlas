// next
import { redirect } from "next/navigation";
// session
import { auth } from "@/auth";
// prisma
import prisma from "@/lib/prisma";
//components
import ProfileForm from "@/app/components/forms/profileForm";
import ProfileData from "@/app/components/profile/profileData";

export default async function Profile() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signIn")
  }
  //get profile data
  const profile = await prisma.user.findUnique({
    where: {
      id: session?.user?.id
    },
    select: {
      profile: {
        select: {
          role: true,
          schools: {
            select: {
              name: true,
              district: true,
            }
          },
          district: true,
        }
      }
    }
  })

  return (
    <section className="flex flex-col w-full gap-6 p-6 bg-slate-800 rounded-lg border border-slate-600 shadow-lg">
      {/* pass in the profile data from below as a prop */}
      {profile && <ProfileData profile={profile} />}
      {!profile?.profile?.role && <ProfileForm />}
    </section>
  )

}
