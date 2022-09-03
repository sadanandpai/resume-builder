// You are also able to use a 3rd party theme this way:
import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    backgroundColor: string;
    fontColor: string;
    titleColor: string;
    highlighterColor: string;
  }
}
