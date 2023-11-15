import { StudentInfo } from "@/app/types/formTypes";
import React from "react";

type ButtonProps = {
  name: string;
  type: "submit" | "reset" | "button";
  width: string;
  onClick: () => void;
};

export default function Button({
  name,
  type,
  width,
  onClick,
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white p-2 m-5 w-${width} rounded-lg`}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
