import React, { ChangeEvent, Fragment, memo } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
        value={experienceInfo.startDate}
        onChange={(newDate) => {
          onChangeHandler('startDate', newDate);
        }}
        inputFormat={'DD/MM/YYYY'}
        renderInput={(params) => (
          <TextField {...params} variant="filled" autoComplete="off" fullWidth required />
        )}
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
        value={experienceInfo.endDate}
        onChange={(newDate) => {
          onChangeHandler('endDate', newDate);
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
        disabled={experienceInfo.isWorkingHere}
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
          const value = e.target.value;
          onChangeHandler('summary', value);
        }}
      />
    </Fragment>
  );
});

Experience.displayName = 'Experience';

export default Experience;
