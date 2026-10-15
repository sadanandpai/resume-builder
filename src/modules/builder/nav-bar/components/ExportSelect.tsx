import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { useId, useState } from 'react';
import { Button, CircularProgress, MenuItem } from '@mui/material';
import Image from '@/helpers/common/components/Image';
import { StyledButton } from '../atoms';
import { NavMenuPopover } from './NavMenuPopover';

type ExportDestination = 'download' | 'cloud';

export const ExportSelect = ({
  onExport,
  isExporting,
  isMenuButton = false,
}: {
  onExport: (destination: ExportDestination) => Promise<void>;
  isExporting: boolean;
  isMenuButton?: boolean;
}) => {
  const cloudId = useCloudResumeStore((state) => state.id);
  const resetId = () => useCloudResumeStore.getState().setId(null);
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const close = () => setAnchorEl(null);
  const triggerProps = {
    id: `${id}-trigger`,
    onClick: (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    'aria-controls': anchorEl ? `${id}-panel` : undefined,
    'aria-expanded': Boolean(anchorEl),
    'aria-haspopup': 'dialog' as const,
    disabled: isExporting,
    'aria-busy': isExporting,
    sx: { '&.Mui-disabled': { color: isMenuButton ? 'text.primary' : 'resume.50', opacity: 1 } },
  };
  const select = (destination: ExportDestination) => {
    close();
    void onExport(destination);
  };

  return (
    <>
      {isMenuButton ? (
        <MenuItem {...triggerProps}>
          {isExporting && (
            <CircularProgress size={18} color="inherit" aria-label="Saving resume" sx={{ mr: 1 }} />
          )}
          {isExporting ? 'Saving…' : 'Export'}
        </MenuItem>
      ) : (
        <StyledButton
          {...triggerProps}
          variant="text"
          endIcon={
            isExporting ? (
              <CircularProgress size={18} color="inherit" aria-label="Saving resume" />
            ) : (
              <Image
                src="/icons/dropdown-arrow.svg"
                alt="dropdown-arrow"
                width="20"
                height="20"
                className={anchorEl ? 'scale-y-[-1]' : ''}
              />
            )
          }
        >
          {isExporting ? 'Saving…' : 'Export'}
        </StyledButton>
      )}
      <NavMenuPopover
        isOpen={Boolean(anchorEl)}
        anchorElement={anchorEl}
        id={`${id}-panel`}
        onClose={close}
      >
        <div className="flex w-64 flex-col gap-3 p-4">
          <Button variant="outlined" onClick={() => select('download')} disabled={isExporting}>
            Download to device
          </Button>
          <p className="text-xs text-gray-600">Save a file to your device.</p>
          <Button variant="contained" onClick={() => select('cloud')} disabled={isExporting}>
            {cloudId ? 'Update in Cloud' : 'Save to cloud'}
          </Button>
          {cloudId ? (
            <p className="text-xs text-gray-600">
              Want a new copy?{' '}
              <button
                type="button"
                onClick={resetId}
                disabled={isExporting}
                className="underline cursor-pointer disabled:opacity-50"
              >
                Reset ID
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-600">Get an ID to load your resume later.</p>
          )}
        </div>
      </NavMenuPopover>
    </>
  );
};
