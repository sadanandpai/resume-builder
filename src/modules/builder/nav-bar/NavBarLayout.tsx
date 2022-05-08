import Image from 'next/image';

import { NavBarMenu, NavBarActions, StyledButton } from './atoms';
import { NavMenuItem } from './components/MenuItem';
import { ThemeSelect } from './components/ThemeSelect';
import { TemplateSelect } from './components/TemplateSelect';

const NavBarLayout = () => {
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center">
      <Image src={'/icons/resume-icon.svg'} alt="logo" height={'36px'} width={'36px'} />
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem caption="Templates" popoverChildren={<TemplateSelect />} />
          <NavMenuItem caption="Themes" popoverChildren={<ThemeSelect />} />
        </NavBarMenu>
        <NavBarActions>
          <StyledButton variant="text">Export</StyledButton>
          <StyledButton variant="text">Import</StyledButton>
          <StyledButton variant="outlined">Export as PDF</StyledButton>
        </NavBarActions>
      </div>
    </nav>
  );
};

export default NavBarLayout;
