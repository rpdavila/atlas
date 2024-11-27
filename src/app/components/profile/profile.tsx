// next
import { permanentRedirect, redirect } from "next/navigation";
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
    permanentRedirect("/signIn")
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
    <section className="flex flex-col basis-3/4 gap-2 m-2">
      {/* pass in the profile data from below as a prop */}
      {profile && <ProfileData profile={profile} />}
      {!profile?.profile?.role && <ProfileForm />}
    </section>
  )

}
