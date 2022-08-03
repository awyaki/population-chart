import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getAllPrefectures } from "@/lib";
import { rest } from "msw";
import { prefsMock, populationMock } from "../../..//mocks/data";
import { handlers } from "../../../mocks/handlers";
import { LineChart } from "./";
import { ErrorBoundary, ErrorFallback } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default {
  title: "LineChart",
  component: LineChart,
  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<ErrorFallback />}>{story()}</ErrorBoundary>
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof LineChart>;

export const Default: ComponentStory<typeof LineChart> = (
  args,
  { loaded: { props } }
) => {
  const { prefectures } = props;
  return <LineChart checkedIds={[1, 4, 29]} prefs={prefectures} />;
};

Default.loaders = [
  async () => {
    const prefs = await getAllPrefectures();
    return {
      props: {
        prefectures: prefs,
      },
    };
  },
];

Default.parameters = {
  msw: {
    handlers: [...handlers],
  },
};

export const PartialError: ComponentStory<typeof LineChart> = (
  args,
  { loaded: { props } }
) => {
  const { prefectures } = props;
  return <LineChart checkedIds={[2, 4, 8]} prefs={prefectures} />;
};

PartialError.loaders = [
  async () => {
    const prefs = await getAllPrefectures();
    return {
      props: {
        prefectures: prefs,
      },
    };
  },
];

PartialError.parameters = {
  msw: {
    handlers: [
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
              ctx.json({
                statusCode: "403",
                message: "Forbidden",
                description: "",
              })
            );
          }

          if (prefCode === "2") {
            return res(
              ctx.status(503),
              ctx.json({
                statusCode: "503",
                message: "Service Unavailable",
                description: "",
              })
            );
          }
          return res(ctx.json(populationMock[Number(prefCode) - 1]));
        }
      ),
    ],
  },
};
