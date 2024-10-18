/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, Fragment, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useVoluteeringStore } from '@/stores/volunteering';
import { IVolunteeringItem } from '@/stores/volunteering.interface';
import { SwitchWidget } from '@/helpers/common/atoms/Switch';
import { RichtextEditor } from '@/helpers/common/components/richtext';
import { DATE_PICKER_FORMAT } from '@/helpers/constants';
import dayjs from 'dayjs';

interface IVolunteerProps {
  volunteeringInfo: IVolunteeringItem;
  currentIndex: number;
}

const Volunteer: React.FC<IVolunteerProps> = ({ volunteeringInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    (name: string, value: any) => {
      const currentExpInfo = { ...volunteeringInfo };
      const updatedVolunteeringExp = useVoluteeringStore.getState().updatedVolunteeringExp;
      switch (name) {
        case 'organisation':
          currentExpInfo.organization = value;
          break;
        case 'role':
          currentExpInfo.position = value;
          break;
        case 'startDate':
          if (value?.isValid()) {
            currentExpInfo.startDate = value;
          }
          break;
        case 'isVolunteeringNow':
          currentExpInfo.isVolunteeringNow = value;
          break;
        case 'endDate':
          if (value?.isValid()) {
            currentExpInfo.endDate = value;
          }
          break;
        case 'summary':
          currentExpInfo.summary = value;
          break;
        default:
          break;
      }
      updatedVolunteeringExp(currentIndex, currentExpInfo);
    },
    [currentIndex, volunteeringInfo]
  );

  const onSummaryChange = useCallback(
    (htmlOutput: string) => {
      onChangeHandler('summary', htmlOutput);
    },
    [onChangeHandler]
  );

  return (
    <Fragment>
      <TextField
        label="Organisation"
        variant="filled"
        value={volunteeringInfo.organization}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('organisation', value);
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Role"
        variant="filled"
        value={volunteeringInfo.position}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('role', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Start date"
        value={dayjs(volunteeringInfo.startDate)}
        onChange={(newDate) => {
          onChangeHandler('startDate', newDate);
        }}
        format={DATE_PICKER_FORMAT}
        slotProps={{
          textField: { variant: 'filled', autoComplete: 'off', fullWidth: true, required: true },
        }}
      />
      <SwitchWidget
        label={'I currently volunteer here'}
        value={volunteeringInfo.isVolunteeringNow ?? false}
        onChange={(newValue: boolean) => {
          onChangeHandler('isVolunteeringNow', newValue);
        }}
      />
      <DatePicker
        label="End date"
        value={volunteeringInfo.isVolunteeringNow ? null : dayjs(volunteeringInfo.endDate)}
        onChange={(newDate) => {
          onChangeHandler('endDate', newDate);
        }}
        format={DATE_PICKER_FORMAT}
        slotProps={{
          textField: {
            variant: 'filled',
            autoComplete: 'off',
            fullWidth: true,
            required: true,
            sx: { marginBottom: '26px' },
          },
        }}
        disabled={volunteeringInfo.isVolunteeringNow}
      />
      <RichtextEditor
        label="Few points on this volunteering experience"
        value={volunteeringInfo.summary}
        onChange={onSummaryChange}
        name="summary"
      />
    </Fragment>
  );
};

export default Volunteer;
