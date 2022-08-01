import { ComponentMeta, ComponentStory } from "@storybook/react";
import { handlers } from "../mocks/handlers";
import { getAllPrefectures, getPopulation } from "@/lib";
import Home from "../src/pages";

export default {
  title: "Home Page",
  component: Home,
} as ComponentMeta<typeof Home>;

export const Default: ComponentStory<typeof Home> = (
  args,
  { loaded: { props } }
) => <Home {...args} {...props} />;

Default.loaders = [
  async () => {
    const prefs = await getAllPrefectures();
    const allPopulation = await getPopulation(prefs);
    return {
      props: {
        prefectures: prefs,
        allPopulation: allPopulation,
      },
    };
  },
];

Default.parameters = {
  msw: {
    handlers: [...handlers],
  },
};
