import React from "react";
import { InstrumentList, StudentList, RentStatus } from "@/app/types/formTypes";
import { instrumentDetails } from "@/app/data/instrumentDetails";
type SelectProps = {
  category: string;
  options: Object | string[] | number[];
  onChange: React.ChangeEventHandler;
  label?: string;
  placeHolder?: string;
};
export default function Select({
  category,
  label,
  options,
  placeHolder,
  onChange,
}: SelectProps): React.JSX.Element {
  return (
    <div className="flex flex-col mt-2">
      <label
        htmlFor="select"
        className="block text-gray-700 text-sm font-bold m-2"
      >
        {label}
      </label>
      <select
        id="select"
        className="shadow border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={category}
        onChange={onChange}
      >
        <option value="">{placeHolder}</option>
        {Array.isArray(options)
          ? options.map((instrument) => (
              <option key={instrument.id} value={instrument.type}>
                {instrument.type}
              </option>
            ))
          : Object.values(options).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
      </select>
    </div>
  );
}
