import { ChangeEvent, Fragment } from 'react';
import { TextField } from '@mui/material';
import { ExperienceItem } from 'src/stores/experience.interface';

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
    </Fragment>
  );
};

export default Experience;
