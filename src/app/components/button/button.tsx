import React from "react";

type ButtonProps = {
  name: string;
  type: "submit" | "reset" | "button";
  width: string;
};

export default function Button({
  name,
  type,
  width,
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white p-2 m-5 w-${width} rounded-lg`}
      type={type}
    >
      {name}
    </button>
  );
}
