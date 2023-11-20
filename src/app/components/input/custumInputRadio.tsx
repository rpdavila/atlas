type CheckProps = {
  labelName: string;
  checked: boolean;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Radio({
  labelName,
  disabled,
  value,
  checked,
  onChange,
}: CheckProps): React.JSX.Element {
  return (
    <>
      <fieldset className="flex flex-row-reverse items-center justify-end">
        <label htmlFor={labelName}>{labelName}</label>
        <input
          type="radio"
          className="mr-2"
          disabled={disabled}
          value={value}
          checked={checked}
          onChange={onChange}
          id={labelName}
        />
      </fieldset>
    </>
  );
}
