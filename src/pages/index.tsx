import Head from 'next/head';
import HomeLayout from '@/modules/home/HomeLayout';

function HomePage() {
  return (
    <div>
      <Head>
        <title>E-Resume: Home</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <HomeLayout />
    </div>
  );
}

export default HomePage;
