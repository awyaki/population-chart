import { FC, useMemo } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataForLineChart = { name: string; points: { x: number; y: number }[] }[];
type LineChartProps = {
  data: DataForLineChart;
};

// TODO: add ErrorBoundary
export const LineChart: FC<LineChartProps> = ({ data }) => {
  const convertedData = useMemo(() => {
    if (data.length === 0) return [];
    if (data.length === 1) return convert(data).flatMap((d) => d);
    // Assertion: `data` array must have at least two element, so initial value of reduce method can be removed.
    return convert(data).reduce((acc, cur) => zip(acc, cur));
  }, [data]);

  return (
    <ResponsiveContainer>
      <RechartsLineChart
        data={convertedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" label="（年度）" />
        <YAxis label="（万人）" />
        <Tooltip />
        <Legend />
        {data.map(({ name }) => (
          <Line
            key={name}
            dataKey={name}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

/*
 * convert data for Recharts' LineChart component
 * */

const convert = (data: DataForLineChart) =>
  data.map(({ name, points }) => points.map(({ x, y }) => ({ x, [name]: y })));

/*
 * Use the zip function to make a new array that each element is
 * made from two elements on the same place of passed two arrays.
 *
 * - example
 * call: zip([{ a: 3, b: 0 }], [{ a: 9, b: 8, c: 10 }])
 * returned value: [{ a: 3, b: 0, c: 10 }]
 *
 * Properties of argument a is always prior to that of b.
 * So in the above example, the returned value is not [{ a: 9, b: 8, c: 10 }].
 *
 * */

const zip = <T extends object, U extends object>(
  a: readonly T[],
  b: readonly U[]
): (T & U)[] => {
  if (a.length !== b.length)
    throw new Error("The length of a must be the same length of b");
  const helper = (
    a: readonly T[],
    b: readonly U[],
    acc: (T & U)[]
  ): (T & U)[] => {
    if (a.length === 0) return acc;
    // If object b[0] has the same properties of a[0],
    // the properties will be overwritten by the properties of a[0].
    return helper(a.slice(1), b.slice(1), acc.concat({ ...b[0], ...a[0] }));
  };
  return helper(a, b, []);
};
