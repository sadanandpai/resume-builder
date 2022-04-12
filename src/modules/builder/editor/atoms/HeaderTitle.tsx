import Image from 'next/image';
import React from 'react';

const HeaderTitle = ({ title }: { title: string }) => (
  <div className="flex my-5 cursor-pointer">
    <div className="mr-6">
      <Image src="/icons/eye.svg" alt="eye" height="10px" width="15px" />
    </div>

    <p>{title}</p>

    <div className="ml-auto">
      <Image src="/icons/right-arrow.svg" alt="eye" height="10px" width="15px" />
    </div>
  </div>
);

export default HeaderTitle;
