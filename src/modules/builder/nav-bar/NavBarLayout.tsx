import Image from 'next/image';
import Button from '@mui/material/Button';

import { NavBarMenu, NavBarActions } from './atoms';
import { NavMenuItem } from './components/MenuItem';
import { ThemeSelectPopover } from './components/ThemeSelect';

const NavBarLayout = () => {
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center">
      <Image src={'/icons/right-arrow.svg'} alt="logo" height={'39px'} width={'31px'} />
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem caption="Templates" popoverChildren={<ThemeSelectPopover />} />
          <NavMenuItem caption="Themes" popoverChildren={<ThemeSelectPopover />} />
        </NavBarMenu>
        <NavBarActions>
          <Button variant="text" color="resume50">
            Export
          </Button>
          <Button variant="text" color="resume50">
            Import
          </Button>
          <Button variant="outlined" color="resume50">
            Export as PDF
          </Button>
        </NavBarActions>
      </div>
    </nav>
  );
};

export default NavBarLayout;
