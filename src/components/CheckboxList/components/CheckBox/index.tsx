import { FC } from "react";
import { styled } from "@/styles";

type CheckBoxProps = {
  isChecked: boolean;
  value: string;
  onClick: () => void;
};

export const CheckBox: FC<CheckBoxProps> = ({ isChecked, value, onClick }) => {
  return (
    <>
      <input
        id={`checkbox-for-${value}`}
        type="checkbox"
        checked={isChecked}
        onClick={onClick}
        readOnly
      />
      <Label htmlFor={`checkbox-for-${value}`}>{value}</Label>
    </>
  );
};

const Label = styled("label", {
  paddingLeft: ".5rem",
});
