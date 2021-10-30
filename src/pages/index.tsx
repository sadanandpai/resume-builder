import type { NextPage } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import Hero from 'src/home/hero';
import Features from 'src/home/features';

const Main = styled.main`
  max-width: 1200px;
  padding: 10px 0;
  margin: 0 5%;

  & > div {
    margin-bottom: 25px;
  }

  @media (min-width: 768px) {
    margin: auto;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Resume Builder</title>
        <meta name="description" content="Single Page Resume Builder for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Hero />
        <Features />
      </Main>
    </>
  );
};

export default Home;
