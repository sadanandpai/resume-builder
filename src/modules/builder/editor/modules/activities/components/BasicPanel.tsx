import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { IActivityTab } from '../ActivitiesLayout';

const BasicPanel = ({ activeTab }: { activeTab: IActivityTab }) => {
  const ActiveTabComponent = activeTab.component;

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
        <ActiveTabComponent />
      </Box>
    </Fragment>
  );
};

export default BasicPanel;
