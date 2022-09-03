import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Involvements from './Involvements';
import Achievements from './Achievements';
import { IActivityTab } from '../ActivitiesLayout';
import { IActivity } from 'src/stores/activity.interface';
import { useActivity } from 'src/stores/activity';

const BasicPanel = ({
  activeTab,
  activities,
}: {
  activeTab: IActivityTab;
  activities: IActivity;
}) => {
  const onChangeHandler = (value: string, key: string) => {
    if (key === 'involvements') {
      useActivity.getState().updateInvolvements(value);
    } else if (key === 'achievements') {
      useActivity.getState().updateAchievements(value);
    }
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
        {activeTab.key == 'involvements' && (
          <Involvements value={activities.involvements} onChangeHandler={onChangeHandler} />
        )}
        {activeTab.key == 'achievements' && (
          <Achievements value={activities.achievements} onChangeHandler={onChangeHandler} />
        )}
      </Box>
    </Fragment>
  );
};

export default BasicPanel;
