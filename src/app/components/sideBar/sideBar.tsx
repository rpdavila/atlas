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
  const selectOption = useAppSelector((state) => state.searchOptions.type);
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
    }
  }

  useEffect(() => {
    async function getSchools() {
      const schools = await getSchoolsByUserId(session.data?.user?.id || "");
      return schools
    }
    getSchools().then((schools) => {
      dispatch(setSchools({ schools: schools }));
    });
  }, [session.data?.user?.id, dispatch])

  return (
    <aside className="hidden sm:flex flex-col items-center m-2 rounded-lg w-full">
      <SelectSearchOptions>
        {getFormComponent(selectOption)}
      </SelectSearchOptions>
      <SchoolSelectForm schools={schoolList} />
    </aside>
  );
}

