import { getStudentById } from "@/actions/actions"
export default async function StudentInfo(
  { params }:
    {
      params: { id: string }
    }) {
  const student = await getStudentById(params.id)
  return (
    <>
      <h1 className="text-2xl">
        Name: {student?.firstName} {student?.lastName}
      </h1>
      <p>Student ID Number: {student?.studentIdNumber}</p>
      <p>School: {student?.school?.name}</p>
    </>
  )
}