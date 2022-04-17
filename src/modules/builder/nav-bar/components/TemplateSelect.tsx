import { Divider, Button, styled, alpha } from '@mui/material';

import { TemplateSlider } from './TemplatesSlider';

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.resume[800],
  borderColor: theme.palette.resume[100],
  ':hover': {
    borderColor: theme.palette.resume[800],
    backgroundColor: alpha(theme.palette.resume[800], 0.04),
  },
}));

export const TemplateSelect = () => {
  return (
    <div className={`h-[459px] w-[474px] bg-white flex flex-col px-10 py-[23px] shadow-2xl`}>
      <TemplateSlider />
      <Divider />
      <span className="text-resume-800 font-bold text-lg my-[14px]">
        Want to build your own template?
      </span>
      <div>
        <StyledButton variant="outlined">Contribute on Github</StyledButton>
      </div>
    </div>
  );
};
