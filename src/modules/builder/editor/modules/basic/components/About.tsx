import React, { Fragment, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

const About = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any;
  onChangeHandler: (value: any, key: string) => void;
}) => {
  return (
    <Fragment>
      <TextField
        id="filled-multiline-static"
        label="About me"
        multiline
        rows={4}
        defaultValue={basicTabs.summary}
        variant="filled"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(event.target.value, 'summary');
        }}
      />
      <TextField
        id="filled-multiline-static"
        label="Career Objective"
        multiline
        rows={4}
        defaultValue={basicTabs.objective}
        variant="filled"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(event.target.value, 'objective');
        }}
      />
    </Fragment>
  );
};

export default About;
