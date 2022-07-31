import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { LineChart } from "./";

export default {
  title: "LineChart",
  component: LineChart,
  decorators: [(story) => <div style={{ height: "100vh" }}>{story()}</div>],
} as ComponentMeta<typeof LineChart>;

export const PopulationOfPrefectures: ComponentStoryObj<typeof LineChart> = {
  args: {
    data: [
      {
        name: "東京都",
        points: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 8 },
          { x: 4, y: 2 },
          { x: 5, y: 2 },
        ],
      },
      {
        name: "大阪府",
        points: [
          { x: 1, y: 9 },
          { x: 2, y: 3 },
          { x: 3, y: 10 },
          { x: 4, y: 7 },
          { x: 5, y: 6 },
        ],
      },
      {
        name: "兵庫県",
        points: [
          { x: 1, y: 29 },
          { x: 2, y: 7 },
          { x: 3, y: 8 },
          { x: 4, y: 10 },
          { x: 5, y: 18 },
        ],
      },
    ],
  },
};
/*

export const PopulationOfPrefectures: ComponentStoryObj<typeof LineChart> = {
  args: {
    XAxisLabel: "年",
    YAxisLabel: "人口",
    data: [
      {
        name: "東京都",
        points: [
          { x: 10, y: 10 },
          { x: 20, y: 30 },
        ],
      },
      {
        name: "大阪府",
        points: [
          { x: 10, y: 10 },
          { x: 20, y: 30 },
        ],
      },
    ],
  },
};
*/
