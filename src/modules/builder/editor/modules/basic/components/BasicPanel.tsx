import React, { ChangeEvent, Fragment } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BasicPanel = ({
  activeTab,
  basicTabs,
  onChangeText,
}: {
  activeTab: number;
  basicTabs: any;
  onChangeText: any;
}) => {
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    tabIndex: number,
    fieldIndex: number
  ) => {
    const updatedTabs = [...basicTabs];
    updatedTabs[tabIndex].fields[fieldIndex].value = event.target.value;
    onChangeText(updatedTabs);
  };
  return (
    <Fragment>
      {basicTabs.map((tab: any, tabIndex: number) => (
        <div role="tabpanel" hidden={activeTab !== tabIndex} key={tabIndex}>
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
            {tab.fields.map((field: any, fieldIndex: number) => (
              <TextField
                label={field.name}
                variant="filled"
                key={fieldIndex}
                defaultValue={field.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onChangeHandler(event, tabIndex, fieldIndex);
                }}
              />
            ))}
          </Box>
        </div>
      ))}
    </Fragment>
  );
};

export default BasicPanel;
