import type { NextPage, GetStaticProps } from "next";
import { Prefecture, Population } from "@/types";
import { useCheckboxList, useLineChart } from "@/hooks";
import { getAllPrefectures, getPopulation } from "@/lib";
import { ErrorBoundary, ErrorFallback } from "@/components";
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
      <Container>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <div>{renderCheckboxList()}</div>
          <div>{renderLineChart()}</div>
        </ErrorBoundary>
      </Container>
    </PageLayout>
  );
};

export default Home;

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  "@md": {
    flexDirection: "row",
    "> div": {
      width: "50%",
    },
    gap: 0,
  },
});
