import { FC } from "react";
import { styled } from "@/styles";
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
    <Fieldset>
      <Legend>{title}</Legend>
      {data.map(({ id, isChecked, value }) => (
        <div key={value}>
          <CheckBox
            isChecked={isChecked}
            value={value}
            onClick={() => onClick(id)}
          />
        </div>
      ))}
    </Fieldset>
  );
};

const Legend = styled("legend", {
  fontSize: "$md",
  marginBottom: "1rem",
});

const Fieldset = styled("fieldset", {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "-.8rem",
  "> div": {
    marginRight: ".8rem",
    marginBottom: ".8rem",
  },
});
