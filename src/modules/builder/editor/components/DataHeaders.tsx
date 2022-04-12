import { Divider } from '@mui/material';
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
    <div className="p-8">
      {headerTitles.map((title) => (
        <div key={title}>
          <HeaderTitle title={title} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default DataHeaders;
