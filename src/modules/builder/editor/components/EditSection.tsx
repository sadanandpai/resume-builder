import Image from 'next/image';
import Link from 'next/link';

interface props {
  section: {
    title: string;
    component: () => JSX.Element;
  };
}

const EditSection = ({ section }: props) => {
  return (
    <>
      <div className="flex items-center mb-6 mt-4">
        <Link href="/builder" passHref>
          <div className="pr-2 mr-2 cursor-pointer">
            <Image src="/icons/left-arrow.svg" alt="back" width={8} height={12} />
          </div>
        </Link>
        <span className="text-2xl font-bold">{section.title}</span>
      </div>
      <section.component />
    </>
  );
};

export default EditSection;
