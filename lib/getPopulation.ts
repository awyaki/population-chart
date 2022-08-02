import axios from "axios";
import { RESASPopulation, Population } from "@/types";

export const getPopulation = async (pref: {
  prefCode: number;
  prefName: string;
}): Promise<Population> => {
  const API_KEY = process.env.RESAS_API_KEY;
  if (API_KEY === undefined) throw new Error("API_KEY is undefined.");

  const { prefCode, prefName } = pref;

  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`;
  const fetchedData = (
    await axios.get<RESASPopulation>(url, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    })
  ).data;

  const res = convertDataToFrontend(prefCode, prefName, fetchedData);
  return res;
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
