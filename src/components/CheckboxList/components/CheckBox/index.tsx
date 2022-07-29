import { FC } from "react";

type CheckBoxProps = {
  isChecked: boolean;
  value: string;
  onClick: () => void;
};

export const CheckBox: FC<CheckBoxProps> = ({ isChecked, value, onClick }) => {
  return (
    <label>
      <input type="checkbox" checked={isChecked} onClick={onClick} readOnly />
      {value}
    </label>
  );
};
