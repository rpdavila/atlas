"use client";
import { useEffect } from "react";
//redux
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setSchools } from "@/lib/ReduxSSR/features/userSlice";
//components
import SelectSearchOptions from "../searchForm/selectSearchOptions";
import StudentForm from "../forms/studentForm";
import InstrumentForm from "../forms/instrumentForm";
import SchoolSelectForm from "../forms/schoolSelectForm";
// server actions
import { getSchoolsByUserId } from "@/actions/actions";
//session
import { useSession } from "next-auth/react";

export default function SideBar() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const selectedSearchType = useAppSelector((state) => state.searchOptions.type);
  const schoolList = useAppSelector((state) => state.userInfo.schools);

  function getFormComponent(selectOption: string) {
    switch (selectOption) {
      case "Search Student":
        return <StudentForm formTitle="Search Student" schools={schoolList} />;

      case "Search Instrument":
        return <InstrumentForm formTitle="Search Instrument" schools={schoolList} />;

      case "Add Student":
        return <StudentForm formTitle="Add Student" schools={schoolList} />

      case "Add Instrument":
        return <InstrumentForm formTitle="Add Instrument" schools={schoolList} />
      default:
        return null
    }
  }

  useEffect(() => {
    const userId = session.data?.user?.id;
    if (!userId) return;

    const fetchSchools = async () => {
      try {
        const schools = await getSchoolsByUserId(userId);
        dispatch(setSchools({ schools }));
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      }
    };

    fetchSchools();
  }, [session.data?.user?.id, dispatch])

  return (
    <aside className="flex flex-col items-center m-2 rounded-lg w-full gap-2">
      <SelectSearchOptions>
        {getFormComponent(selectedSearchType)}
      </SelectSearchOptions>
      {selectedSearchType === "Search Instrument" && <SchoolSelectForm schools={schoolList} />}
      {selectedSearchType === "Search Student" && <SchoolSelectForm schools={schoolList} />}
    </aside>
  );
}

