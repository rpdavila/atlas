"use clinet";
import { Spinner } from "@heroui/react";

type ButtonProps = {
  name: string;
  marginTop?: string;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  disabledColor?: boolean;
  icon?: React.JSX.Element;
  danger?: boolean;
  signIn?: boolean;
  isPending?: boolean;
  pendingName?: string;
};

export default function Button({
  name,
  type,
  marginTop,
  onClick,
  icon,
  danger,
  signIn,
  isPending,
  pendingName
}: ButtonProps): React.JSX.Element {
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white p-2 mt-${marginTop} w-full sm:w-full rounded-lg`;
  const greyColor = `bg-gray-300 text-black p-2 mt-${marginTop} w-full rounded-lg`;
  const dangerColor = `bg-red-500 hover:bg-red-700 text-white p-2 mt-${marginTop} w-full sm:w-full rounded-lg`;
  return (
    <button
      className={isPending ? greyColor : danger ? dangerColor : buttonClass}
      type={type}
      onClick={onClick}
      disabled={isPending}
    >
      <div className="flex flex-row justify-center items-center gap-2 w-auto self-center">
        {icon && icon}
        {isPending && <Spinner size="sm" color="primary" />}
        {isPending && pendingName}
        {!isPending && name}
      </div>
    </button>
  );
}
