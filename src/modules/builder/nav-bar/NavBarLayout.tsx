import Image from 'next/image';

import { NavBarMenu } from './atoms/NavBarMenu';
import { NavBarActions } from './atoms/NavBarActions';
import { CustomizedButton } from 'src/common/components';

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
