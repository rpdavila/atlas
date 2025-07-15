"use client";
//next import
import { usePathname, useRouter } from "next/navigation";

// redux imports
import { useAppSelector, useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { RootState } from "@/lib/ReduxSSR/store";
import { setType } from "@/lib/ReduxSSR/features/searchOptionsSlice";
//component imports

import { Select, SelectItem } from "@heroui/react";
import { tools } from "@/app/data/tools";

type SearchOptionProps = {
  children: React.ReactNode;
};

export default function SelectSearchOptions({ children }: SearchOptionProps) {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const router = useRouter();

  const selectOption = useAppSelector(
    (state: RootState) => state.searchOptions.type
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setType(value));
    if (value === "Search Student") router.push("/dashboard/searchStudent");
    if (value === "Search Instrument") router.push("/dashboard/searchInstrument");
    if (value === "Search District") router.push("/dashboard/districtInstruments");
  }

  return (
    <>
      <div className="hidden sm:flex w-full">
        <Select
          label="Tools"
          className="w-full"
          onChange={handleChange}
          classNames={{
            trigger: "bg-slate-100 hover:border-slate-600",
            label: "text-slate-600 hover:text-slate-600",
            value: "text-slate-100",
            popoverContent: "bg-slate-100 border-slate-300",
          }}
        >
          {tools.map((tool) => (
            <SelectItem
              key={tool.key}
            >
              {tool.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      {children}
    </>
  );
}
