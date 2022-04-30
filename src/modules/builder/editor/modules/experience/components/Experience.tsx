import React, { ChangeEvent, Fragment, memo } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useExperiences } from 'src/stores/experience';
import { ExperienceItem } from 'src/stores/experience.interface';
import { SwitchWidget } from 'src/helpers/common/atoms/Switch';

interface Props {
  experienceInfo: ExperienceItem;
  currentIndex: number;
}

const Experience: React.FC<Props> = memo(({ experienceInfo, currentIndex }) => {
  const { set: setExperiences, experiences } = useExperiences();

  const onChangeHandler = (name: string, value: any) => {
    const currentExpInfo = { ...experienceInfo };
    switch (name) {
      case 'companyName':
        currentExpInfo.companyName = value;
        break;
      case 'position':
        currentExpInfo.position = value;
        break;
      case 'startDate':
        currentExpInfo.startDate = value;
        break;
      case 'isWorkingHere':
        currentExpInfo.isWorkingHere = value;
        break;
      case 'endDate':
        currentExpInfo.endDate = value;
        break;
      case 'summary':
        currentExpInfo.summary = value;
        break;
      default:
        break;
    }
    const updatedWorkExperiences = [...experiences];
    updatedWorkExperiences[currentIndex] = currentExpInfo;
    setExperiences(updatedWorkExperiences);
  };

  return (
    <Fragment>
      <TextField
        label="Comapany name"
        name={'companyName'}
        variant="filled"
        value={experienceInfo.companyName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const name = e.target.name;
          const value = e.target.value;
          onChangeHandler(name, value);
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={experienceInfo.isEnabled ? true : false}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Position"
        name={'position'}
        variant="filled"
        value={experienceInfo.position}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const name = e.target.name;
          const value = e.target.value;
          onChangeHandler(name, value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Start date"
        value={experienceInfo.startDate}
        onChange={(newValue) => {
          const formattedDate = dayjs(newValue).format('DD/MM/YYYY');
          onChangeHandler('startDate', formattedDate);
        }}
        inputFormat={'DD/MM/YYYY'}
        renderInput={(params) => (
          <TextField {...params} variant="filled" autoComplete="off" fullWidth required />
        )}
      />
      <SwitchWidget
        label={'I currently work here'}
        value={experienceInfo.isWorkingHere}
        onChange={(newValue: boolean) => {
          onChangeHandler('isWorkingHere', newValue);
        }}
      />
      <DatePicker
        label="End date"
        value={experienceInfo.endDate}
        onChange={(newValue) => {
          const formattedDate = dayjs(newValue).format('DD/MM/YYYY');
          onChangeHandler('endDate', formattedDate);
        }}
        inputFormat={'DD/MM/YYYY'}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            autoComplete="off"
            fullWidth
            required
            sx={{ marginBottom: '26px' }}
          />
        )}
      />
      <TextField
        id="filled-multiline-static"
        label="Few points on this work experience"
        multiline
        rows={4}
        variant="filled"
        autoComplete="off"
        fullWidth
        name="summary"
        value={experienceInfo.summary}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const name = e.target.name;
          const value = e.target.value;
          onChangeHandler(name, value);
        }}
      />
    </Fragment>
  );
});

// revisit
Experience.displayName = 'Experience';

export default Experience;
