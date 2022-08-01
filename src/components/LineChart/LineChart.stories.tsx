import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { LineChart } from "./";

export default {
  title: "LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

export const PopulationOfPrefectures: ComponentStoryObj<typeof LineChart> = {
  args: {
    data: [
      {
        name: "東京都",
        points: [
          { x: 1900, y: 1000000 },
          { x: 1905, y: 2000000 },
          { x: 1910, y: 5000000 },
          { x: 1915, y: 3000000 },
          { x: 1920, y: 1000000 },
        ],
      },
      {
        name: "大阪府",
        points: [
          { x: 1900, y: 2000000 },
          { x: 1905, y: 2000000 },
          { x: 1910, y: 6000000 },
          { x: 1915, y: 300000 },
          { x: 1920, y: 600000 },
        ],
      },
      {
        name: "兵庫県",
        points: [
          { x: 1900, y: 3000000 },
          { x: 1905, y: 220000 },
          { x: 1910, y: 650000 },
          { x: 1915, y: 300000 },
          { x: 1920, y: 1000000 },
        ],
      },
    ],
  },
};
