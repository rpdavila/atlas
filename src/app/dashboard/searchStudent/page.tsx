import { getStudents } from "@/actions/actions";
import SearchStudent from "@/app/components/searchStudent/searchStudent";
import { StudentList } from "@/app/types/formTypes";

export default async function StudentPage() {
  const displayStudents: StudentList = await getStudents();
  return (
    <SearchStudent displayStudents={displayStudents} />
  )
}