import { FC } from "react";

import { CheckBox } from "./components";

type CheckboxListProps = {
  title: string;
  data: { id: number; isChecked: boolean; value: string }[];
  onClick: (id: number) => void;
};

export const CheckboxList: FC<CheckboxListProps> = ({
  title,
  onClick,
  data,
}) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      {data.map(({ id, isChecked, value }) => (
        <CheckBox
          key={value}
          isChecked={isChecked}
          value={value}
          onClick={() => onClick(id)}
        />
      ))}
    </fieldset>
  );
};
