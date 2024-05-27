type ButtonProps = {
  name: string;
  marginTop?: string;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  disabledColor?: boolean;
};

export default function Button({
  name,
  type,
  marginTop,
  disabled,
  onClick,
  disabledColor,
}: ButtonProps): React.JSX.Element {
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white p-2 mt-${marginTop} w-full rounded-lg`;
  const greyColor = `bg-gray-300 text-black p-2 mt-${marginTop} w-full rounded-lg`;
  return (
    <>
      <button
        className={disabledColor ? greyColor : buttonClass}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {name}
      </button>
    </>
  );
}
