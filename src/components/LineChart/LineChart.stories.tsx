import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getAllPrefectures } from "@/lib";
import { handlers } from "../../../mocks/handlers";
import { LineChart } from "./";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default {
  title: "LineChart",
  component: LineChart,
  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
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
