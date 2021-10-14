import React from 'react';
import { Resume } from 'src/core/containers/Resume';
import { Sidebar } from 'src/core/containers/Sidebar';
import { LeftNav } from 'src/core/containers/LeftNav';
import { Flex } from 'src/assets/styles/styles';

export const Home = () => (
  <Flex jc="space-between">
    <LeftNav />
    <Resume />
    <Sidebar />
  </Flex>
);
