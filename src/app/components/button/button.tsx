import { useFormStatus } from "react-dom";
import { Spinner } from "@nextui-org/react";

type ButtonProps = {
  loadingName: string;
  name: string;
  marginTop?: string;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  disabledColor?: boolean;
};

export default function Button({
  loadingName,
  name,
  type,
  marginTop,
  onClick,
}: ButtonProps): React.JSX.Element {
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white p-2 mt-${marginTop} w-full sm:w-full rounded-lg`;
  const greyColor = `bg-gray-300 text-black p-2 mt-${marginTop} w-full rounded-lg`;

  const { pending } = useFormStatus();
  return (
    <button
      className={pending ? greyColor : buttonClass}
      type={type}
      onClick={onClick}
      disabled={pending}
    >
      {pending && <Spinner size="sm" color="default" />}
      {pending && loadingName}
      {!pending && name}
    </button>

  );
}
