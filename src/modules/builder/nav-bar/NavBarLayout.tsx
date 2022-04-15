import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { NavBarMenu } from './atoms/NavBarMenu';
import { NavBarActions } from './atoms/NavBarActions';

const theme = createTheme({
  palette: {
    resume50: {
      main: '#E7EEFA',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    resume50: object;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    resume50?: object;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    resume50: true;
  }
}

const NavBarLayout = () => {
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 px-4 items-center">
      <Image src={'/icons/right-arrow.svg'} alt="logo" height={'39px'} width={'32px'} />

      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <h1 className="text-resume-50">Templates</h1>
          <h1 className="text-resume-50">Themes</h1>
        </NavBarMenu>
        <NavBarActions>
          <ThemeProvider theme={theme}>
            <Button variant="text" color="resume50">
              Export
            </Button>
            <Button variant="text" color="resume50">
              Import
            </Button>
            <Button variant="outlined" color="resume50">
              Export as PDF
            </Button>
          </ThemeProvider>
        </NavBarActions>
      </div>
    </nav>
  );
};

export default NavBarLayout;
