import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Details = {
  Contact: string[];
  Links: string[];
  About: string[];
};

const tabs: Details = {
  Contact: ['Name', 'Title', 'Email', 'Phone', 'Location'],
  Links: ['LinkedIn', 'Twitter', 'Github', 'Hackerrank', 'Hackerearth', 'Codechef'],
  About: ['About me', 'Career objective'],
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const BasicLayout = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const BasicDetailsTabsTitle = () => (
    <Tabs value={value} onChange={handleChange} variant="fullWidth">
      {Object.keys(tabs).map((key, index) => (
        <Tab
          key={index}
          label={key}
          sx={{ color: 'rgb(46 64 82)', textTransform: 'none', fontSize: '1rem' }}
        />
      ))}
    </Tabs>
  );

  const BasicDetailsTabs = () => {
    return (
      <Box>
        {Object.keys(tabs).map((key, index) => (
          <TabPanel value={value} index={index} key={index}>
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
              {tabs[key as keyof Details].map((label, index) => (
                <TextField
                  label={label}
                  variant="filled"
                  key={index}
                  multiline
                  rows={key == 'About' ? 4 : 1}
                />
              ))}
            </Box>
          </TabPanel>
        ))}
      </Box>
    );
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  return (
    <>
      <BasicDetailsTabsTitle></BasicDetailsTabsTitle>
      <BasicDetailsTabs></BasicDetailsTabs>
    </>
  );
};

export default BasicLayout;
