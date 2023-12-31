import type { NextPage } from 'next';
import Head from 'next/head';
import SignInLayout from 'src/modules/sign-in/SignInLayout';

const SignIn: NextPage = () => {
  return (
    <div>
      <Head>
        <title>E-Resume: Home | Simplest way to build a professional resume</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <SignInLayout />
    </div>
  );
};

export default SignIn;
