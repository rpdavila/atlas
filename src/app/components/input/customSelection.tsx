import React, {useEffect} from "react";
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
    <div className="flex flex-col justify-center">
      <label htmlFor="select" className="block text-gray-700 text-sm font-bold">
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
          ? options.map((item) => (
              <option key={item.id} value={item.type || item.firsName}>
                {item.type || `${item.firstName} ${item.lastName}`}
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
