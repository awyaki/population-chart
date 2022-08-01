import type { FC, ReactNode } from "react";
import { styled } from "@/styles";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled("div", {
  padding: "0 1rem",
  "@sm": {
    padding: "0 2rem",
  },
  "@md": {
    padding: "0 3rem",
  },
  "@lg": {
    padding: "0 6rem",
  },
  "@xl": {
    padding: "0 10rem",
  },
});
