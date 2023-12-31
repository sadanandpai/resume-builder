import type { NextPage } from 'next';
import Head from 'next/head';
import BuilderLayout from 'src/modules/builder/BuilderLayout';

const BuilderPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>E-Resume: Builder | Simplest way to build a professional resume</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <BuilderLayout />
    </div>
  );
};

export default BuilderPage;
