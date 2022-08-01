import axios from "axios";
import { RESASPopulation, Population } from "@/types";

export const getPopulation = async (
  prefs: readonly { prefCode: number; prefName: string }[]
): Promise<Population[]> => {
  const API_KEY = process.env.RESAS_API_KEY;
  if (API_KEY === undefined) throw new Error("API_KEY is undefined.");

  const throttleTime = 250; // RESAS_API allow to throw 5 queries per second at most.
  const res = Promise.all(
    await prefs.reduce(
      (promise, { prefCode, prefName }) =>
        promise.then((acc) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                acc.concat(
                  fetchPopulation(prefCode, API_KEY).then((data) =>
                    convertDataToFrontend(prefCode, prefName, data.data)
                  )
                )
              );
            }, throttleTime);
          });
        }),
      Promise.resolve<Promise<Population>[]>([])
    )
  );

  return res;
};

const fetchPopulation = (prefCode: number, apiKey: string) => {
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`;
  return axios.get<RESASPopulation>(url, {
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
  });
};

const convertDataToFrontend = (
  prefCode: number,
  prefName: string,
  fetchedData: RESASPopulation
): Population => {
  const targetLabel = "総人口";
  const resultData = fetchedData.result.data;
  const boundaryYear = fetchedData.result.boundaryYear;
  const isExistTargetLabel = resultData.some(
    ({ label }) => label === targetLabel
  );

  if (!isExistTargetLabel)
    throw new Error(
      "No elements of `resultData` have a label property that value is `targetLabel`."
    );

  const totalPopulationPerPrefecture = (() => {
    const filteredbyLabel = fetchedData.result.data.filter(
      ({ label }) => label === targetLabel
    );
    // `filtered[0]` is always exist becuase of a test of `isExistTargetLabel`,
    // so this code is safe.
    const filteredByBoundaryYear = filteredbyLabel[0].data.filter(
      ({ year }) => year <= boundaryYear
    );
    return filteredByBoundaryYear;
  })();

  return { prefCode, prefName, data: totalPopulationPerPrefecture };
};
