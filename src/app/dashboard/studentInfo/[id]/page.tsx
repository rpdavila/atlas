import { getStudentById } from "@/actions/actions"
import { notFound } from "next/navigation"

type Student = {
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  instrumentAssignment: {
    instrument: {
      classification: string;
      brand: string;
      serialNumber: string;
    };
  } | null;
  school?: {
    name: string
  } | null;
} | null

export default async function StudentInfo({ params }: {params: {id: string}}) {
  try {
    const student: Student = await getStudentById(params.id)
    if (!student) {
      notFound()
    }

    return (
      <section className="bg-slate-100 rounded-lg">
        <h1 className="text-2xl">
          Name: {student?.firstName} {student?.lastName}
        </h1>
        <p>Student ID Number: {student?.studentIdNumber}</p>
        <p>School: {student?.school?.name}</p>
      </section>
    )
  } catch (error) {
    throw error
  }
}