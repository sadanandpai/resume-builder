import { Fragment, useState } from 'react';

import { INavMenuItemProps } from './MenuItem.interface';
import Image from 'next/image';
import { NavMenuPopover } from './NavMenuPopover';
import { StyledButton } from '../atoms';

export const NavMenuItem = ({ caption, popoverChildren }: INavMenuItemProps) => {
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
            width="20"
            height="20"
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
