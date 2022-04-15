import Button from '@mui/material/Button';

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    resume50: true;
    // resume100: true;
    // resume200: true;
    // resume300: true;
    // resume400: true;
    // resume500: true;
    // resume600: true;
    // resume700: true;
    // resume800: true;
    // resume900: true;
  }
}

export const CustomizedButton = Button;
