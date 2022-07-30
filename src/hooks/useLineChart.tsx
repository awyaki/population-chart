import { useCallback, ComponentProps } from "react";
import { LineChart } from "@/components";
import { Population } from "@/types";

export const useLineChart = (
  allPopulation: Population[],
  checkedIds: number[]
) => {
  const renderLineChart = useCallback(
    () => (
      <LineChart
        XAxisLabel="年度"
        YAxisLabel="人口数"
        data={convertToLinChart(allPopulation, checkedIds)}
      />
    ),
    [allPopulation, checkedIds]
  );
  return renderLineChart;
};

const convertToLinChart = (
  allPopulation: Population[],
  checkedIds: number[]
): ComponentProps<typeof LineChart>["data"] => {
  const filteredData = allPopulation.filter(({ prefCode }) =>
    checkedIds.includes(prefCode)
  );

  return filteredData.map(({ prefName, data }) => ({
    name: prefName,
    points: data.map(({ year, value }) => ({ x: year, y: value })),
  }));
};
