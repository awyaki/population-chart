import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { CheckBox } from "./";

export default {
  title: "CheckBox",
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

export const Checked: ComponentStoryObj<typeof CheckBox> = {
  args: {
    isChecked: true,
    value: "りんご",
  },
};

export const UnChecked: ComponentStoryObj<typeof CheckBox> = {
  args: {
    isChecked: false,
    value: "東京都",
  },
};
