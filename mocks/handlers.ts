import { rest } from "msw";
import { prefsMock, populationMock } from "./data";

export const handlers = [
  rest.get(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    (_, res, cxt) => {
      return res(cxt.json(prefsMock));
    }
  ),
  rest.get(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
    (req, res, ctx) => {
      const prefCode = req.url.searchParams.get("prefCode");

      if (prefCode == null) {
        return res(
          ctx.status(403),
          ctx.json({ statusCode: "403", message: "Forbidden", description: "" })
        );
      }
      return res(ctx.json(populationMock[Number(prefCode) - 1]));
    }
  ),
];
