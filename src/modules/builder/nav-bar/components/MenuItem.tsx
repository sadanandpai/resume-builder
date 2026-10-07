import { Fragment, useState, useId } from 'react';

import { INavMenuItemProps } from './MenuItem.interface';
import Image from '@/helpers/common/components/Image';
import { NavMenuPopover } from './NavMenuPopover';
import { StyledButton } from '../atoms';

export const NavMenuItem = ({ caption, popoverChildren }: INavMenuItemProps) => {
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <StyledButton
        variant="text"
        size="small"
        onClick={handleClick}
        id={`${id}-trigger`}
        aria-controls={anchorEl ? `${id}-panel` : undefined}
        aria-expanded={!!anchorEl}
        aria-haspopup="dialog"
        sx={{ fontSize: { xs: '10px', lg: '13px' } }}
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
      <NavMenuPopover
        isOpen={!!anchorEl}
        anchorElement={anchorEl}
        id={`${id}-panel`}
        onClose={handleClose}
      >
        {popoverChildren}
      </NavMenuPopover>
    </Fragment>
  );
};
