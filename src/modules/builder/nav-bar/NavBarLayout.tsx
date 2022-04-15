import Image from 'next/image';

import { CustomizedButton } from 'src/common/components';

import { NavBarMenu, NavBarActions } from './atoms';
import { NavMenuItem } from './components/MenuItem';
import { ThemeSelectPopover } from './components/ThemeSelect';

const NavBarLayout = () => {
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 px-4 items-center">
      <Image src={'/icons/right-arrow.svg'} alt="logo" height={'39px'} width={'32px'} />
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem caption="Templates" popoverChildren={<ThemeSelectPopover />} />
          <NavMenuItem caption="Templates" popoverChildren={<ThemeSelectPopover />} />
        </NavBarMenu>
        <NavBarActions>
          <CustomizedButton variant="text" color="resume50">
            Import
          </CustomizedButton>
          <CustomizedButton variant="text" color="resume50">
            Import
          </CustomizedButton>
          <CustomizedButton variant="outlined" color="resume50">
            Export as PDF
          </CustomizedButton>
        </NavBarActions>
      </div>
    </nav>
  );
};

export default NavBarLayout;
