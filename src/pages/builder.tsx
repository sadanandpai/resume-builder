import type { NextPage } from 'next';
import Head from 'next/head';
import BuilderLayout from '@/modules/builder/BuilderLayout';
import { useRouter } from 'next/router';
import useAuth from '@/helpers/useAuth';
import { useEffect } from 'react';

const BuilderPage: NextPage = () => {
  const user = useAuth();
  const router = useRouter();

  // Redirecting to login if user is not logged in
  useEffect(() => {
    if (user === null) {
      const redirectPath = encodeURIComponent(router.asPath);
      router.push(`/auth?redirect=${redirectPath}`);
    }
  }, [user, router]);

  // Showing loading state while user auth status is being determined
  if (user === undefined) {
    return <p>Loading...</p>;
  }

  // Allow access only if the user is logged in
  return (
    <div>
      <Head>
        <title>E-Resume: Builder</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>
      <BuilderLayout />
    </div>
  );
};

export default BuilderPage;
