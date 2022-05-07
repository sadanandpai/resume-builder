import Image from 'next/image';

const HeaderTitle = ({ title }: { title: string }) => (
  <div className="flex items-center my-5 cursor-pointer">
    <div className="mr-6 flex items-center">
      <Image src="/icons/eye.svg" alt="eye" height="16px" width="16px" />
    </div>

    <p className="text-xl">{title}</p>

    <div className="ml-auto pl-4 flex items-center">
      <Image src="/icons/right-arrow.svg" alt="right-arrow" height="16px" width="16px" />
    </div>
  </div>
);

export default HeaderTitle;
