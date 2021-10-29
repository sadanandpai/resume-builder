import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const H1 = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin: 2rem 0;
`;

const CTA = styled.div`
  padding: 0.4rem;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: auto;
  width: 150px;
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

      <main>
        <H1>Welcome to Single Page Resume Builder !!!</H1>

        <Link href="/editor">
          <a>
            <CTA>Get Started</CTA>
          </a>
        </Link>

        <Points>
          <p>Completely free and open source.</p>
          <p>No registration or signin required.</p>
          <p>100% customizable for your requirements</p>
          <p>Build your resume within minutes</p>
        </Points>
      </main>
    </>
  );
};

export default Home;
