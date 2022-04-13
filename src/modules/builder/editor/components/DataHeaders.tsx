import { Divider } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import HeaderTitle from '../atoms/HeaderTitle';

const headerTitles = [
  'Basic details',
  'Skills and expertise',
  'Education',
  'Experience',
  'Activities',
  'Volunteering',
  'Awards',
];

const DataHeaders = () => {
  return (
    <>
      {headerTitles.map((title) => (
        <Link href={`/builder/${title.toLowerCase().replaceAll(' ', '')}`} key={title} passHref>
          <a>
            <HeaderTitle title={title} />
            <Divider />
          </a>
        </Link>
      ))}
    </>
  );
};

export default DataHeaders;
