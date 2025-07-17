"use client"
// react imports
import { useState, useEffect} from "react";
//redux imports
import { useAppSelector } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
//type 
import { RentStatus } from "@prisma/client";
//auth imports
import { useSession } from "next-auth/react";
//component imports
import StudentCardList from "../../components/card-list/studentCardList";
import StudentSearchForm from "../forms/studentSearchForm";
import Loading from "../loading/loading";
import SchoolSelectForm from "../forms/schoolSelectForm";
// actions imports`
import { getStudentsByUserId } from "@/actions/actions";


type Student = {
  school: {
    name: string;
  } | null;
  id: string;
  instrumentAssignment: {
    instrument: {
      school: {
        name: string;
      };
      id: string;
      classification: string;
      brand: string;
      serialNumber: string;
      rentStatus: RentStatus;
    };
  } | null;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
}

type Students = Student[]

export default function SearchStudents() {

  let studentSearchResults: Students = [];
  const session = useSession();
  //grab searchfield
  const searchField: string = useAppSelector(
    (state: RootState) => state.searchOptions.search
  );

  const schoolList = useAppSelector((state: RootState) => state.userInfo.schools);

  const [displayStudents, setDisplayStudents] = useState<Students | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  if (!!displayStudents) {
    studentSearchResults = displayStudents?.filter((student: Student) => {
      return (
        student.firstName.includes(searchField) ||
        student.lastName.includes(searchField) ||
        student.studentIdNumber.includes(searchField) ||
        student.school?.name.includes(searchField)
      );
    });
  }


  useEffect(() => {
    const getStudents = async () => {
      if (!session.data?.user?.id) {
        return;
      }
      try {
        setLoading(true);
        const studentData = await getStudentsByUserId(session.data.user.id as string);

        setDisplayStudents(studentData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };
    getStudents();
  }, [session.data?.user?.id]);
  return (
    <>
      {loading ? (
        <Loading />
      )
        : (
          <section className="flex flex-col w-full min-h-screen items-center p-4 gap-4">
            <section className="flex flex-col w-full gap-2  md:hidden">
              <StudentSearchForm />
              <SchoolSelectForm schools={schoolList} />
            </section>
            <StudentCardList studentSearchResult={studentSearchResults} />
          </section>
        )}
    </>
  );
}