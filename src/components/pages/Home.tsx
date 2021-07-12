import React from "react";
import { Resume } from "./Resume";
import { Sidebar } from "./Sidebar";
import { Flex } from "../common/styles";

export const Home = () => {
  return (
    <Flex jc="space-between">
      <Resume />
      <Sidebar />
    </Flex>
  );
};
