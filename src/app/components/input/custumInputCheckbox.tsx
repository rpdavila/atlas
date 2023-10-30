type CheckProps = {
  
  labelName: string;
  onChange: () => void;
  checked: boolean;
};

export default function CheckBox({
  labelName,
  checked,
  onChange,
}: CheckProps): React.JSX.Element {
  return (
    <>
      <fieldset className="flex flex-row-reverse items-center justify-end">
        <label>{labelName}</label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mr-2"
        />
      </fieldset>
    </>
  );
}
