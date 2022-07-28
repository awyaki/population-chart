import { FC } from "react";

type CheckBoxProps = {
  isChecked: boolean;
  value: string;
};

export const CheckBox: FC<CheckBoxProps> = ({ isChecked, value }) => {
  return (
    <label>
      <input type="checkbox" checked={isChecked} />
      {value}
    </label>
  );
};
