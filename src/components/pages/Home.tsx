import React from "react";
import { Resume } from "./Resume";
import { RightMenu } from "../widgets/RightMenu";
import { Flex } from "../common/styles";
import { LeftMenu } from "../widgets/LeftMenu";

export const Home = () => {
  return (
    <Flex jc="space-between">
      <LeftMenu />
      <Resume />
      <RightMenu />
    </Flex>
  );
};
