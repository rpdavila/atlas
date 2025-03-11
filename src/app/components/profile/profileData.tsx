"use client"
import { useState } from "react"
import Button from "@/app/components/button/button"
import { deleteAccount } from "@/actions/actions"

import { signOut, useSession, } from "next-auth/react"
import FormWrapper from "../notification/formWrapper"




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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    if (!session.data?.user?.id) {
      return { success: false, message: "No user id found" }
    }
    try {
      setIsDeleting(true)
      const response = await deleteAccount(session.data?.user?.id as string)
      if (response.success) {
        setTimeout(async () => {
          await signOut({ redirect: true, callbackUrl: "/" })
        }, 3000);
        return { success: response.success, message: response.message }
      }
      return { success: response.success, message: response.message }
    } catch (error) {
      return { success: false, message: `Error: ${error}` }
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <>
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


      {profile?.profile?.role && (
        <FormWrapper
          action={handleDelete}
          submitButton={{
            name: "Delete Account",
            type: "submit",
            disabled: isDeleting,
            danger: true,
            pendingName: "Deleting Account"
          }}
          className="mt-4"
        >
          <p className="text-red-500">Warning: This action is irreversible</p>
        </FormWrapper>
      )}

    </>
  )
}