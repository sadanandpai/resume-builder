import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  display: flex;
  align-items: center;

  & > * {
    flex-basis: 50%;
  }
`;

const H3 = styled.h3`
  margin-bottom: -10px;
  font-weight: normal; ;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const CTA = styled.span`
  padding: 0.8rem 2rem;
  background: #6c63ff;
  color: white;
  border-radius: 3px;
  text-align: center;
  font-size: 1rem;
`;

const Points = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 2.5rem 0;

  p {
    margin: 0.5rem 0;
    color: brown;
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
        <Hero>
          <div>
            <H3>Free & Open source</H3>
            <H1>
              Single Page <br />
              Resume Builder
            </H1>
            <Link href="/editor">
              <a>
                <CTA>Get Started</CTA>
              </a>
            </Link>
          </div>
          <Image src="/hiring.svg" alt="hiring" width="300px" height="300px" />
        </Hero>

        <Points>
          <p>Completely free and open source.</p>
          <p>No registration or signin required.</p>
          <p>100% customizable for your requirements</p>
          <p>Build your resume within minutes</p>
        </Points>
      </Main>
    </>
  );
};

export default Home;
