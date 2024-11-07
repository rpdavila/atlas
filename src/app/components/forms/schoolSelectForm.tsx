//nextui
import { RadioGroup, Radio } from "@nextui-org/react";
// redux
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSchool } from "@/lib/ReduxSSR/features/searchOptionsSlice";

export default function SchoolSelectForm({ schools }: { schools: { id: string, name: string }[] }) {
  const dispatch = useAppDispatch();
  const schoolName = useAppSelector((state) => state.searchOptions.school);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSchool(e.target.value))
  }
  return (
    <form
      className="bg-slate-50 w-full rounded-lg m-2 p-2"
    >
      {schools
        ? (<RadioGroup
          name="school"
          label="Select a school"
          onChange={handleChange}
          defaultValue={`${schoolName}`}
        >
          {schools.map((school) => (
            <Radio
              key={school.id}
              value={school.name}
            >
              {school.name}
            </Radio>
          ))}
        </RadioGroup>
        ) : <p>No schools found</p>}

    </form>

  )
}


