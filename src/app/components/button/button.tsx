"use client";
import { Spinner } from "@heroui/react";

type ButtonProps = {
  name: string;
  marginTop?: '1' | '2' | '4' | '8'; // restrict to valid values;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  icon?: React.JSX.Element;
  danger?: boolean;
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
  isPending,
  pendingName,
}: ButtonProps): React.JSX.Element {
  const getMarginClass = (margin?: string) => {
    const marginMap: Record<string, string> = {
      '1': 'mt-1',
      '2': 'mt-2',
      '4': 'mt-4',
      '8': 'mt-8',
    };
    return margin? marginMap[margin] || '':  '';
  }
  const marginClass = getMarginClass(marginTop);
  const buttonClass = `bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 ${marginClass} w-full rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg`;
  const greyColor = `bg-slate-400 text-slate-700 font-medium py-3 px-4 ${marginClass} w-full rounded-lg cursor-not-allowed`;
  const dangerColor = `bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 ${marginClass} w-full rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg`;
  return (
    <button
      className={isPending ? greyColor : danger ? dangerColor : buttonClass}
      type={type}
      onClick={onClick}
      disabled={isPending}
    >
      <div className="flex flex-row justify-center items-center gap-2 w-auto self-center">
        {icon && icon}
        {isPending && <Spinner data-testid="spinner" size="sm" color="primary" />}
        {isPending && pendingName}
        {!isPending && name}
      </div>
    </button>
  );
}
