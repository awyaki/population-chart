import axios from "axios";
import { RESASPrefectures, Prefecture } from "@/types";

export const getAllPrefectures = async (): Promise<Prefecture[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY;
  if (API_KEY === undefined) throw new Error("API_KEY is undefined.");
  const data = await axios.get<RESASPrefectures>(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return data.data.result;
};
