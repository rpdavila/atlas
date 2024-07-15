"use client";
//component imports
import { Input } from "@nextui-org/react";
//redux imports
import { useAppDispatch, useAppSelector } from "@/lib/ReduxSSR/hooks";
import { setSearch } from "@/lib/ReduxSSR/features/searchOptionsSlice";
export default function StudentSearchForm() {
  const dispatch = useAppDispatch()
  const selectOption = useAppSelector((state) => state.searchOptions.type);
  const searchResult = useAppSelector((state) => state.searchOptions.search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <>
      {selectOption === "Search Student" && (
        <Input
          name="search"
          label="Search"
          labelPlacement="inside"
          value={searchResult}
          placeholder="Search Student"
          onChange={handleChange}
          isClearable
          onClear={() => dispatch(setSearch(""))}
          className="sm:mt-2"
        />
      )}
    </>
  );
}