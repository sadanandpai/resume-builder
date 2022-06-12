import React, { ChangeEvent, Fragment } from 'react';
import TextField from '@mui/material/TextField';

const Links = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any;
  onChangeHandler: (value: any, key: string) => void;
}) => {
  return (
    <Fragment>
      <TextField
        label="LinkedIn"
        variant="filled"
        defaultValue={basicTabs.profiles[0].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const profiles = basicTabs.profiles;
          profiles[0].url = event.target.value;
          onChangeHandler(profiles, 'profiles');
        }}
      />
      <TextField
        label="Twitter"
        variant="filled"
        defaultValue={basicTabs.profiles[1].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const profiles = basicTabs.profiles;
          profiles[1].url = event.target.value;
          onChangeHandler(profiles, 'profiles');
        }}
      />
      <TextField
        label="Github"
        variant="filled"
        defaultValue={basicTabs.profiles[2].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const profiles = basicTabs.profiles;
          profiles[2].url = event.target.value;
          onChangeHandler(profiles, 'profiles');
        }}
      />
      <TextField
        label="Hackerrank"
        variant="filled"
        defaultValue={basicTabs.profiles[3].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const profiles = basicTabs.profiles;
          profiles[3].url = event.target.value;
          onChangeHandler(profiles, 'profiles');
        }}
      />
      <TextField
        label="HackerEarth"
        variant="filled"
        defaultValue={basicTabs.profiles[4].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const profiles = basicTabs.profiles;
          profiles[4].url = event.target.value;
          onChangeHandler(profiles, 'profiles');
        }}
      />
      <TextField
        label="CodeChef"
        variant="filled"
        defaultValue={basicTabs.profiles[5].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const profiles = basicTabs.profiles;
          profiles[5].url = event.target.value;
          onChangeHandler(profiles, 'profiles');
        }}
      />
    </Fragment>
  );
};

export default Links;
