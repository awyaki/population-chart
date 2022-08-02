import { useCallback } from "react";
import { LineChart } from "@/components";
import { Prefecture } from "@/types";

export const useLineChart = (prefs: Prefecture[], checkedIds: number[]) => {
  const renderLineChart = useCallback(
    () => <LineChart prefs={prefs} checkedIds={checkedIds} />,
    [checkedIds, prefs]
  );
  return renderLineChart;
};
