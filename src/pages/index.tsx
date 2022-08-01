import type { NextPage, GetStaticProps } from "next";
import { Prefecture, Population } from "@/types";
import { useCheckboxList, useLineChart } from "@/hooks";
import { getAllPrefectures, getPopulation } from "@/lib";
import { Header, ErrorBoundary, ErrorFallback } from "@/components";
import { PageLayout } from "@/layouts";
import { styled } from "@/styles";

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
    <PageLayout>
      <Main>
        <div className="header">
          <Header title="都道府県別人口推移グラフ" />
        </div>
        <Flex>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <div>{renderCheckboxList()}</div>
            <div>{renderLineChart()}</div>
          </ErrorBoundary>
        </Flex>
      </Main>
    </PageLayout>
  );
};

export default Home;

const Main = styled("main", {
  "> .header": {
    marginBottom: "2rem",
  },
});

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  "@lg": {
    flexDirection: "row",
    "> div": {
      width: "50%",
    },
    gap: 0,
  },
});
