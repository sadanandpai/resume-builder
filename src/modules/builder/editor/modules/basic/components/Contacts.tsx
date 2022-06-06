import React, { ChangeEvent, Fragment } from 'react';
import TextField from '@mui/material/TextField';

const Contacts = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any;
  onChangeHandler: (value: any, key: string) => void;
}) => {
  return (
    <Fragment>
      <TextField
        label="Name"
        variant="filled"
        key={basicTabs.name}
        defaultValue={basicTabs.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(event.target.value, 'name');
        }}
      />
      <TextField
        label="Title"
        variant="filled"
        key={basicTabs.label}
        defaultValue={basicTabs.label}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(event.target.value, 'label');
        }}
      />
      <TextField
        label="Email"
        variant="filled"
        key={basicTabs.email}
        defaultValue={basicTabs.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(event.target.value, 'email');
        }}
      />
      <TextField
        label="Phone"
        variant="filled"
        key={basicTabs.phone}
        defaultValue={basicTabs.phone}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(event.target.value, 'phone');
        }}
      />
      <TextField
        label="Location"
        variant="filled"
        key={basicTabs.location}
        defaultValue={basicTabs.location.city}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const location = basicTabs.location;
          location.city = event.target.value;
          onChangeHandler(location, 'location');
        }}
      />
    </Fragment>
  );
};

export default Contacts;
