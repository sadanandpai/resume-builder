import React from 'react';
import { render } from '@testing-library/react';
import { RatedPillElement } from './RatedPills';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';

const theme = createTheme({
  colors: {
    fontColor: 'black',
    backgroundColor: 'white',
    primaryColor: '#1890ff',
    secondaryColor: 'yellowgreen',
  },
  name: 'theme',
} as any);

test('renders', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RatedPillElement itemLabel="JavaScript" itemRating={3} />
    </ThemeProvider>
  );
  expect(getByText('JavaScript')).toBeInTheDocument();
});
