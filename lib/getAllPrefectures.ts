import axios from "axios";

type RESASPrefectures = {
  message: null;
  result: { prefCode: number; prefName: string }[];
};

export const getAllPrefectures = async () => {
  const API_KEY = process.env.RESAS_API_KEY;
  if (API_KEY === undefined) throw new Error("API_KEY is undefined.");

  return await axios.get<RESASPrefectures>(
    "https://opendata.resas-portal.go.jp/pi/v1/prefectures",
    {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
};
