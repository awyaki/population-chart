import type { NextPage, GetStaticProps } from "next";
import { Prefecture, Population } from "@/types";
import { useCheckboxList, useLineChart } from "@/hooks";
import { getAllPrefectures, getPopulation } from "@/lib";
import { ErrorBoundary, ErrorFallback } from "@/components";

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

const Home: NextPage<HomePageProps> = ({ prefectures, allPopulation }) => {
  const [checkedIds, renderCheckboxList] = useCheckboxList(prefectures);
  const renderLineChart = useLineChart(allPopulation, checkedIds);
  return (
    <>
      <ErrorBoundary fallback={<ErrorFallback />}>
        {renderCheckboxList()}
        <div style={{ height: "90vh" }}>{renderLineChart()}</div>
      </ErrorBoundary>
    </>
  );
};

export default Home;
