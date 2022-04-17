import Image from 'next/image';

import { NavBarMenu, NavBarActions, StyledButton } from './atoms';
import { NavMenuItem } from './components/MenuItem';
import { ThemeSelectPopover } from './components/ThemeSelect';

const NavBarLayout = () => {
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center">
      <Image
        src={'/icons/right-arrow.svg'}
        alt="logo"
        height={'39px'}
        width={'31px'}
        className="invisible"
      />
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem caption="Templates" popoverChildren={<ThemeSelectPopover />} />
          <NavMenuItem caption="Themes" popoverChildren={<ThemeSelectPopover />} />
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
