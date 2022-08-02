import { ComponentMeta, ComponentStory } from "@storybook/react";
import { handlers } from "../mocks/handlers";
import { getAllPrefectures } from "@/lib";
import Home from "../src/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default {
  title: "Home Page",
  component: Home,
  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof Home>;

export const Default: ComponentStory<typeof Home> = (
  args,
  { loaded: { props } }
) => <Home {...args} {...props} />;

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
