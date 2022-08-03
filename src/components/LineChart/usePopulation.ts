import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { Prefecture, Population } from "@/types";
import { getPopulation } from "@/lib";

export const usePopulation = (
  checkedIds: number[],
  prefs: Prefecture[]
): [Prefecture[], { year: number; [prefName: string]: number }[]] => {
  const checkedPrefs = useMemo(
    () =>
      checkedIds.map((id) => {
        const target = prefs.find(({ prefCode }) => prefCode === id);
        if (target === undefined)
          throw Error("id that is equal to prefCode doesn't found.");
        return target;
      }),
    [checkedIds, prefs]
  );

  const queries = useQueries({
    queries: checkedPrefs.map(({ prefCode, prefName }) => ({
      queryKey: ["prefecture", prefCode],
      queryFn: () => getPopulation({ prefCode, prefName }),
    })),
  });

  const convertedData = useMemo(() => {
    const data = queries.flatMap(({ data: fetchedData, isError }) => {
      if (isError) throw new Error("Can't fetch population data.");
      if (fetchedData === undefined) return [];
      return fetchedData;
    });

    if (data.length === 0) return [];
    if (data.length === 1) return convert(data).flat();
    // Assertion: `data` array must have at least two element, so initial value of reduce method can be removed.
    return convert(data).reduce((acc, cur) => zip(acc, cur));
  }, [queries]);

  return [checkedPrefs, convertedData];
};

/*
 * convert data for Recharts' LineChart component
 * */

const convert = (data: Population[]) =>
  data.map(({ prefName, data: populationData }) =>
    populationData.map(({ year, value }) => ({ year, [prefName]: value }))
  );

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
