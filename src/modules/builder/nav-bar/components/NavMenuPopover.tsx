import Popover from '@mui/material/Popover';

interface NavMenuPopoverProps {
  isOpen: boolean;
  anchorElement: Element | null;
  children: React.ReactNode;
  id: string;
  onClose: () => void;
}

export const NavMenuPopover = ({
  isOpen,
  anchorElement,
  children,
  id,
  onClose,
}: NavMenuPopoverProps) => {
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id={id}
      onClose={onClose}
    >
      {children}
    </Popover>
  );
};
