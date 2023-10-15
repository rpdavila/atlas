type RadioProps = {
  type: string;
  labelName: string;
  onChange?: () => void;
  checked: boolean;
};

export default function CheckBox({
  type,
  labelName,
  checked,
  onChange,
}: RadioProps): React.JSX.Element {
  return (
    <>
      <fieldset className="flex flex-row-reverse items-center justify-end">
        <label>{labelName}</label>
        <input
          type={type}
          checked={checked}
          onChange={onChange}
          className="mr-2"
        />
      </fieldset>
    </>
  );
}
