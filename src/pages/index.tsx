import type { NextPage, GetStaticProps } from "next";
import { Prefectures } from "@/types";
import { useCheckboxList } from "@/hooks";
import { getAllPrefectures } from "@/lib";

type HomePageProps = {
  prefectures: Prefectures;
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const prefs: Prefectures = (await getAllPrefectures()).data.result.map(
    ({ prefCode, prefName }) => ({ id: prefCode, name: prefName })
  );

  return {
    props: {
      prefectures: prefs,
    },
  };
};

const Home: NextPage<HomePageProps> = ({ prefectures }) => {
  const [checkedIds, renderCheckboxList] = useCheckboxList(prefectures);
  return <>{renderCheckboxList()}</>;
};

export default Home;
