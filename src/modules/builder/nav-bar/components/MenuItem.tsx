import { Fragment, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';

import { NavMenuPopover } from './NavMenuPopover';

interface NavMenuItemProps {
  caption: string;
  popoverChildren: React.ReactNode;
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
      <Button
        variant="text"
        color="resume50"
        onClick={handleClick}
        aria-describedby={'mark'}
        endIcon={
          <Image
            src={'/icons/down-arrow.svg'}
            alt="down-arrow"
            width={'20px'}
            height={'20px'}
            className={`${anchorEl ? 'scale-y-[-1]' : ''}`}
          />
        }
      >
        {caption}
      </Button>
      <NavMenuPopover isOpen={!!anchorEl} anchorElement={anchorEl} id="mark" onClose={handleClose}>
        {popoverChildren}
      </NavMenuPopover>
    </Fragment>
  );
};
