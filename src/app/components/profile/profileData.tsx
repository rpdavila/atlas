import { auth } from "@/auth"
import prisma from "@/lib/prisma"


export default async function ProfileData() {
  const session = await auth()
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
    <table className="bg-slate-50 rounded-lg">
      <tr className="border-b-small border-slate-700 rounded-lg">
        <td>Name</td>
        <td>{session?.user?.name}</td>
      </tr>
      <tr className="border-b-small border-slate-700 rounded-lg">
        <td>Email</td>
        <td>{session?.user?.email ? session.user.email : "No Data"}</td>
      </tr>
      <tr className="border-b-small border-slate-700 rounded-lg">
        <td>Role</td>
        <td>{profile?.profile?.role
          ? profile.profile.role : "No Data"}</td>
      </tr>
      <tr className="border-b-small border-slate-700 rounded-lg">
        <td>School(s)</td>
        <td>
          {profile?.profile?.schools
            ? profile?.profile?.schools.map((school, index) => {
              return (
                <>
                  <p key={`${index}-${school.name}`}>{school.name}</p>
                </>
              )
            })
            : "No Data"}
        </td>
      </tr>
      <tr className="border-b-small border-slate-700 rounded-lg">
        <td>District</td>
        <td>{profile?.profile?.district ? profile?.profile?.district.name : "No Data"}</td>
      </tr>
    </table>
  )
}