import { ChangeEvent, Fragment } from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { ExperienceItem } from 'src/stores/experience.interface';
import { SwitchWidget } from 'src/helpers/common/atoms/Switch';

const Experience = ({ experienceInfo }: { experienceInfo: ExperienceItem }) => {
  const onChangeHandler = (name: string, value: any) => {
    switch (name) {
      case 'companyName':
        break;
      case 'position':
        break;
      default:
        break;
    }
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
        autoFocus
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
          console.info('date', newValue);
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
          console.log('sdfs');
        }}
      />
      <DatePicker
        label="End date"
        value={experienceInfo.endDate}
        onChange={(newValue) => {
          console.info('date', newValue);
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
        value={experienceInfo.summary}
      />
    </Fragment>
  );
};

export default Experience;
