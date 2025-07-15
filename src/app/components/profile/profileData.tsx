"use client"
import { useState } from "react"
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
      <div className="bg-slate-100 rounded-lg p-6 border border-slate-300 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-600 mb-4 border-b border-slate-600 pb-2">Profile Information</h2>
        <dl className="space-y-4">
          <div className="flex justify-between py-2 border-b border-slate-600">
            <dt className="font-medium text-slate-600">Name:</dt>
            <dd className="text-slate-600">{session?.data?.user?.name}</dd>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-600">
            <dt className="font-medium text-slate-600">Email:</dt>
            <dd className="text-slate-600">{session?.data?.user?.email || "No Data"}</dd>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-600">
            <dt className="font-medium text-slate-600">Role:</dt>
            <dd className="text-slate-600">{profile?.profile?.role || "No Data"}</dd>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-600">
            <dt className="font-medium text-slate-600">School(s):</dt>
            <dd className="text-slate-600">
              {profile?.profile?.schools?.length ? (
                <ul className="space-y-1">
                  {profile.profile.schools.map((school, index) => (
                    <li key={`${index}-${school.name}`}>{school.name}</li>
                  ))}
                </ul>
              ) : "No Data"}
            </dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="font-medium text-slate-600">District:</dt>
            <dd className="text-slate-600">{profile?.profile?.district?.name || "No Data"}</dd>
          </div>
        </dl>
      </div>


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
          <p className="text-red-700 bg-red-900/10 p-3 rounded border border-red-700 mb-2">Warning: This action is irreversible</p>
        </FormWrapper>
      )}

    </>
  )
}