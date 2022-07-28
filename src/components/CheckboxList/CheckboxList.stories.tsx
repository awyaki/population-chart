import { ComponentStoryObj, ComponentMeta } from "@storybook/react";

import { CheckboxList } from "./";

export default {
  title: "CheckboxList",
  component: CheckboxList,
} as ComponentMeta<typeof CheckboxList>;

export const ListOfPrefectures: ComponentStoryObj<typeof CheckboxList> = {
  args: {
    title: "都道府県",
    data: [
      {
        isChecked: true,
        value: "東京都",
      },
      {
        isChecked: true,
        value: "大阪府",
      },
      {
        isChecked: false,
        value: "兵庫県",
      },
    ],
  },
};
