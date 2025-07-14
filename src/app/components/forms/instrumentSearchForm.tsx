"use client";
//component imports
import { Input } from "@heroui/react";
//redux imports
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSearch } from "@/lib/ReduxSSR/features/searchOptionsSlice";
export default function InstrumentSearchForm() {
  const dispatch = useAppDispatch()
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  const searchResult = useAppSelector((state) => state.searchOptions.search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <>
      {selectOption === "Search Instrument" && (
        <Input
          name="search"
          value={searchResult}
          placeholder="Search Instrument"
          onChange={handleChange}
          isClearable
          onClear={() => dispatch(setSearch(""))}
        />
      )}
    </>
  );
}