import { FC } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import AutoSizer from "react-virtualized-auto-sizer";
import { styled, colors } from "@/styles";
import { Prefecture } from "@/types";
import { usePopulation } from "./usePopulation";

type LineChartProps = {
  checkedIds: number[];
  prefs: Prefecture[];
};

export const LineChart: FC<LineChartProps> = ({ checkedIds, prefs }) => {
  const [checkedPrefs, data] = usePopulation(checkedIds, prefs);
  return (
    <Container>
      <AutoSizer>
        {({ width }) => (
          <RechartsLineChart
            width={width}
            height={width * (3 / 4)}
            data={data}
            margin={{
              top: 35,
              right: 0,
              left: 0,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              label={{
                value: "（年度）",
                position: "insideBottomRight",
                offset: -10,
              }}
              tick={data.length !== 0}
            />
            <YAxis
              tickFormatter={tickFormatter}
              label={{ value: "（万人）", position: "top", offset: 17 }}
            />
            <Tooltip
              labelFormatter={(value) => `${value}年`}
              formatter={toolTipFormatter}
            />
            <Legend />
            {checkedPrefs.map(({ prefName }, i) => (
              <Line
                key={prefName}
                dataKey={prefName}
                stroke={pickStrokeColor(i)}
                activeDot={{ r: 8 }}
              />
            ))}
          </RechartsLineChart>
        )}
      </AutoSizer>
    </Container>
  );
};

const Container = styled("div", { height: "1px" });

const pickStrokeColor = (index: number): string => {
  const colorsValues = Object.values(colors.accent);
  const length = colorsValues.length;
  return colorsValues[index % length];
};

const toolTipFormatter = (value: number): string => {
  const formatted = Intl.NumberFormat().format(value);
  return `${formatted}人`;
};

const tickFormatter = (value: number): string => String(value / 10_000);
