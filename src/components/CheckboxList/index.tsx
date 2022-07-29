import { FC } from "react";

import { CheckBox } from "./components";

type CheckboxListProps = {
  title: string;
  data: { id: number; isChecked: boolean; value: string }[];
};

export const CheckboxList: FC<CheckboxListProps> = ({ title, data }) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      {data.map(({ isChecked, value }) => (
        <CheckBox key={value} isChecked={isChecked} value={value} />
      ))}
    </fieldset>
  );
};
