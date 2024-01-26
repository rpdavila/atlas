type ButtonProps = {
  name: string;
  marginTop: string;
  type: "submit" | "reset" | "button";
  onClick: () => void;
};

export default function Button({
  name,
  type,
  marginTop,
  onClick,
}: ButtonProps): React.JSX.Element {
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white p-2 mt-${marginTop} w-full rounded-lg`;

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {name}
    </button>
  );
}
