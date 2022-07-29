import type { NextPage, GetStaticProps } from "next";
import { Prefecture } from "@/types";
import { useCheckboxList } from "@/hooks";
import { getAllPrefectures } from "@/lib";

type HomePageProps = {
  prefectures: Prefecture[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const prefs: Prefecture[] = (await getAllPrefectures()).data.result.map(
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
