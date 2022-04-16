import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';

import { NavMenuPopover } from './NavMenuPopover';

interface NavMenuItemProps {
  caption: string;
  popoverChildren: React.ReactNode; // #TODO
}

export const NavMenuItem = ({ caption, popoverChildren }: NavMenuItemProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button variant="text" color="resume50" onClick={handleClick} aria-describedby={'mark'}>
        {caption}
      </Button>
      <NavMenuPopover isOpen={!!anchorEl} anchorElement={anchorEl} id="mark" onClose={handleClose}>
        {popoverChildren}
      </NavMenuPopover>
    </Fragment>
  );
};
