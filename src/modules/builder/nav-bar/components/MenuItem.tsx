import { Fragment, useState } from 'react';
import Image from 'next/image';

import { NavMenuPopover } from './NavMenuPopover';
import { StyledButton } from '../atoms';
import { NavMenuItemProps } from './MenuItem.interface';

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
      <StyledButton
        variant="text"
        onClick={handleClick}
        aria-describedby={'mark'}
        endIcon={
          <Image
            src={'/icons/dropdown-arrow.svg'}
            alt="dropdown-arrow"
            width={'20px'}
            height={'20px'}
            className={`${anchorEl ? 'scale-y-[-1]' : ''}`}
          />
        }
      >
        {caption}
      </StyledButton>
      <NavMenuPopover isOpen={!!anchorEl} anchorElement={anchorEl} id="mark" onClose={handleClose}>
        {popoverChildren}
      </NavMenuPopover>
    </Fragment>
  );
};
