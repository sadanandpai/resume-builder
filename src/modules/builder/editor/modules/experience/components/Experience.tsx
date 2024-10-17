import React, { ChangeEvent, Fragment, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useExperiences } from '@/stores/experience';
import { IExperienceItem } from '@/stores/experience.interface';
import { SwitchWidget } from '@/helpers/common/atoms/Switch';
import { RichtextEditor } from '@/helpers/common/components/richtext';
import { DATE_PICKER_FORMAT } from '@/helpers/constants';

interface IExperienceProps {
  experienceInfo: IExperienceItem;
  currentIndex: number;
}

const Experience: React.FC<IExperienceProps> = ({ experienceInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, value: any) => {
      const currentExpInfo = { ...experienceInfo };
      const updateExperience = useExperiences.getState().updateExperience;
      switch (name) {
        case 'companyName':
          currentExpInfo.name = value;
          break;
        case 'position':
          currentExpInfo.position = value;
          break;
        case 'startDate':
          if (value?.isValid()) {
            currentExpInfo.startDate = value;
          }
          break;
        case 'isWorkingHere':
          currentExpInfo.isWorkingHere = value;
          break;
        case 'endDate':
          if (value?.isValid()) {
            currentExpInfo.endDate = value;
          }
          break;
        case 'years':
          currentExpInfo.years = value;
          break;
        case 'summary':
          currentExpInfo.summary = value;
          break;
        default:
          break;
      }
      updateExperience(currentIndex, currentExpInfo);
    },
    [currentIndex, experienceInfo]
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
        label="Comapany name"
        variant="filled"
        value={experienceInfo.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('companyName', value);
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Position"
        variant="filled"
        value={experienceInfo.position}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('position', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Start date"
        format={DATE_PICKER_FORMAT}
        value={dayjs(experienceInfo.startDate)}
        onChange={(newDate) => {
          onChangeHandler('startDate', newDate);
        }}
        slotProps={{
          textField: { variant: 'filled', autoComplete: 'off', fullWidth: true, required: true },
        }}
      />
      <SwitchWidget
        label={'I currently work here'}
        value={experienceInfo.isWorkingHere ?? false}
        onChange={(newValue: boolean) => {
          onChangeHandler('isWorkingHere', newValue);
        }}
      />
      <DatePicker
        label="End date"
        format={DATE_PICKER_FORMAT}
        value={experienceInfo.isWorkingHere ? null : dayjs(experienceInfo.endDate)}
        onChange={(newDate) => {
          onChangeHandler('endDate', newDate);
        }}
        slotProps={{
          textField: {
            variant: 'filled',
            autoComplete: 'off',
            fullWidth: true,
            required: true,
            sx: { marginBottom: '26px' },
          },
        }}
        disabled={experienceInfo.isWorkingHere}
      />
      <TextField
        label="Years"
        variant="filled"
        value={experienceInfo.years}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('years', value);
        }}
        autoComplete="off"
        fullWidth
        sx={{ marginBottom: '26px' }}
      />
      <RichtextEditor
        label="Few points on this work experience"
        value={experienceInfo.summary}
        onChange={onSummaryChange}
        name="summary"
      />
    </Fragment>
  );
};

export default Experience;
