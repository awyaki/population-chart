import { FC } from "react";
import { styled } from "@/styles";

type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Container>
      <h1 className="title">{title}</h1>
    </Container>
  );
};

const Container = styled("header", {
  paddingTop: "2rem",
  "> .title": {
    fontSize: "$xl",
  },
});
