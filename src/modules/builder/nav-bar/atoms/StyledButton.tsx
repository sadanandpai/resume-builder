import { Button, styled, alpha } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.resume[50],
  borderColor: alpha(theme.palette.resume[50], 0.8),
  ':hover': {
    borderColor: theme.palette.resume[50],
    backgroundColor: alpha(theme.palette.resume[50], 0.04),
  },
}));
