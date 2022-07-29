import type { NextPage, GetStaticProps } from "next";
import { Prefecture, Population } from "@/types";
import { useCheckboxList } from "@/hooks";
import { getAllPrefectures, getPopulation } from "@/lib";

type HomePageProps = {
  prefectures: Prefecture[];
  allPopulation: Population[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const prefs = (await getAllPrefectures()).data.result;
  const allPopulation = await getPopulation(prefs);
  return {
    props: {
      prefectures: prefs,
      allPopulation: allPopulation,
    },
  };
};

const Home: NextPage<HomePageProps> = ({ prefectures }) => {
  const [checkedIds, renderCheckboxList] = useCheckboxList(prefectures);
  return <>{renderCheckboxList()}</>;
};

export default Home;
