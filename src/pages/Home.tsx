import React from "react";
import { Resume } from "src/containers/layouts/Resume";
import { Sidebar } from "src/containers/layouts/Sidebar";
import { LeftNav } from "../containers/layouts/LeftNav";
import { Flex } from "../assets/styles/styles";

export const Home = () => (
  <Flex jc="space-between">
    <LeftNav />
    <Resume />
    <Sidebar />
  </Flex>
);
