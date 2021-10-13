import React from "react";
import { Resume } from "./Resume";
import { Sidebar } from "./Sidebar";
import { Flex } from "../common/styles";
import { LeftNav } from "./LeftNav";

export const Home = () => (
  <Flex jc="space-between">
    <LeftNav />
    <Resume />
    <Sidebar />
  </Flex>
);
