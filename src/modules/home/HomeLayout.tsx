import Link from 'next/link';

const HomeLayout = () => {
  return (
    <>
      <h1 className="text-3xl text-center">Single Page Resume Builder</h1>
      <div className="text-center mt-4">
        <Link href="/builder" passHref={true}>
          <button className="bg-resume-200 p-4 rounded-md">Start Building</button>
        </Link>
      </div>
    </>
  );
};

export default HomeLayout;
