import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-emotion-theme';
import { createTheme } from '@mui/material/styles';

const theme1 = createTheme({
  colors: {
    fontColor: 'black',
    backgroundColor: 'white',
    primaryColor: '#1890ff',
    secondaryColor: 'yellowgreen',
  },
  name: 'theme1',
});

const theme2 = createTheme({
  colors: {
    fontColor: 'magenta',
    backgroundColor: 'white',
    primaryColor: 'lime',
    secondaryColor: 'burlywood',
  },
  name: 'theme2',
});

const theme3 = createTheme({
  colors: {
    fontColor: 'black',
    backgroundColor: 'white',
    primaryColor: 'green',
    secondaryColor: 'orange',
  },
  name: 'theme3',
});

// pass ThemeProvider and array of your themes to decorator
addDecorator(withThemesProvider([theme1, theme2, theme3]));
