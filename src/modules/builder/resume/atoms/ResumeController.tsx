import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import { ReactNode } from 'react';

const ResumeController = ({
  zoomIn,
  zoomOut,
  resetZoom,
}: {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}) => {
  return (
    <div className="flex">
      {/* <div className="flex items-center pr-4">
        <Image
          src="/icons/fit-height.svg"
          className="cursor-pointer"
          alt="Fit height"
          width="24px"
          height="24px"
        />
      </div> */}

      <div className="flex items-center gap-5">
        <TooltipRenderer title="Zoom out">
          <Image
            src="/icons/zoom-out.svg"
            className="cursor-pointer"
            alt="Zoom out"
            width="24px"
            height="24px"
            onClick={zoomOut}
          />
        </TooltipRenderer>
        <TooltipRenderer title="Zoom in">
          <Image
            src="/icons/zoom-in.svg"
            className="cursor-pointer"
            alt="Zoom in"
            width="24px"
            height="24px"
            onClick={zoomIn}
          />
        </TooltipRenderer>
        <TooltipRenderer title="Reset zoom">
          <Image
            src="/icons/reset-zoom.svg"
            className="cursor-pointer"
            alt="Reset zoom"
            width="24px"
            height="24px"
            onClick={resetZoom}
          />
        </TooltipRenderer>
      </div>
    </div>
  );
};

export default ResumeController;

function TooltipRenderer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Tooltip title={title}>
      <div className="w-auto h-auto flex">{children}</div>
    </Tooltip>
  );
}
