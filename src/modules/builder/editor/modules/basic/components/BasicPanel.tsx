import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Contacts from './Contacts';
import Links from './Links';
import About from './About';

const BasicPanel = ({
  activeTab,
  basicTabs,
  onChangeText,
}: {
  activeTab: number;
  basicTabs: any;
  onChangeText: any;
}) => {
  const onChangeHandler = (value: any, key: string) => {
    const updatedTabs = { ...basicTabs };
    updatedTabs[key] = value;
    onChangeText(updatedTabs);
  };

  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { margin: '0.5rem 0' },
          backgroundColor: 'rgb(231 238 250)',
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        {activeTab == 0 && (
          <Contacts basicTabs={basicTabs} onChangeHandler={onChangeHandler}></Contacts>
        )}
        {activeTab == 1 && <Links basicTabs={basicTabs} onChangeHandler={onChangeHandler}></Links>}
        {activeTab == 2 && <About basicTabs={basicTabs} onChangeHandler={onChangeHandler}></About>}
      </Box>
    </Fragment>
  );
};

export default BasicPanel;
