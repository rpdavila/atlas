import React, { ChangeEventHandler } from "react";

type TextProps = {
  type: string;
  name: string;
  labelName: string;
  placeHolder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
};

export default function TextInput({
  type,
  labelName,
  name,
  value,
  placeHolder,
  onChange,
}: TextProps): React.JSX.Element {
  return (
    <div className="flex flex-col mt-2">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold m-2"
      >
        {labelName}
      </label>
      <input
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        name={name}
        value={value}
        placeholder={placeHolder}
        id={name}
        onChange={onChange}
      />
    </div>
  );
}
