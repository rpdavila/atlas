"use client"
import { useState } from "react"
import Button from "@/app/components/button/button"
import { deleteAccount } from "@/actions/actions"

import { signOut, useSession, } from "next-auth/react"
import { useRouter } from "next/navigation"


type ProfileData = {
  profile: {
    role: string;
    schools: {
      name: string;
      district: {
        id: string;
        name: string;
        profileId: string | null;
        state: string;
      } | null;
    }[];
    district: {
      id: string;
      name: string;
      profileId: string | null;
      state: string;
    } | null;
  } | null;
} | null


export default function ProfileData({ profile }: { profile: ProfileData }) {
  const session = useSession();

  const [message, setMessage] = useState<string | null>(null)

  return (
    <>
      {message && <p className={`${message ? "bg-green-500" : "bg-red-500"} text-slate-100 w-3`}>{message}</p>}
      <table className="bg-slate-50 rounded-lg">
        <tbody>
          <tr className="border-b-small border-slate-700 rounded-lg">
            <td>Name</td>
            <td>{session?.data?.user?.name}</td>
          </tr>
          <tr className="border-b-small border-slate-700 rounded-lg">
            <td>Email</td>
            <td>{session?.data?.user?.email ? session.data?.user.email : "No Data"}</td>
          </tr>
          <tr className="border-b-small border-slate-700 rounded-lg">
            <td>Role</td>
            <td>{profile?.profile?.role
              ? profile.profile.role : "No Data"}</td>
          </tr>
          <tr className="border-b-small border-slate-700 rounded-lg">
            <td>School(s)</td>
            {profile?.profile?.schools
              ? profile?.profile?.schools.map((school, index) => {
                return (
                  <td key={`${index}-${school.name}`} className="border-b-small border-slate-700">
                    {school.name}
                  </td>
                )
              })
              : (<td>{"No Data"}</td>)}

          </tr>
          <tr className="border-b-small border-slate-700 rounded-lg">
            <td>District</td>
            <td>{profile?.profile?.district ? profile?.profile?.district.name : "No Data"}</td>
          </tr>
        </tbody>
      </table>
      <form action={async () => {
        const response = await deleteAccount(session.data?.user?.id as string)
        if (response.success) {
          setMessage(response.message)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          await signOut({ redirect: true, callbackUrl: "/" })
        } else {
          setMessage("Error deleting account")
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        }
      }
      }
      >
        {profile?.profile?.role && <Button danger type="submit" name="Delete Account" />}
      </form>

    </>
  )
}