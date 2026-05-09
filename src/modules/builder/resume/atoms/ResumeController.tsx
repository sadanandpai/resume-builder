import Image from 'next/image';
import { ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';

const ResumeController = ({
  zoomIn,
  zoomOut,
  resetZoom,
  isReorderMode,
  onToggleReorder,
  onResetLayout,
}: {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  isReorderMode: boolean;
  onToggleReorder: () => void;
  onResetLayout: () => void;
}) => {
  return (
    <div className="hidden lg:flex">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="rounded border cursor-pointer border-resume-300 px-3 py-1.5 text-xs font-medium text-resume-700 transition-colors hover:border-resume-500 hover:bg-resume-100"
          onClick={onToggleReorder}
        >
          {isReorderMode ? 'Done reordering' : 'Enable section reorder'}
        </button>
        <button
          type="button"
          className="rounded border cursor-pointer border-resume-300 px-3 py-1.5 text-xs font-medium text-resume-700 transition-colors hover:border-resume-500 hover:bg-resume-100"
          onClick={onResetLayout}
        >
          Reset section layout
        </button>
        <TooltipRenderer title="Zoom out">
          <Image
            src="/icons/zoom-out.svg"
            className="cursor-pointer"
            alt="Zoom out"
            width="24"
            height="24"
            onClick={zoomOut}
          />
        </TooltipRenderer>
        <TooltipRenderer title="Zoom in">
          <Image
            src="/icons/zoom-in.svg"
            className="cursor-pointer"
            alt="Zoom in"
            width="24"
            height="24"
            onClick={zoomIn}
          />
        </TooltipRenderer>
        <TooltipRenderer title="Reset zoom">
          <Image
            src="/icons/reset-zoom.svg"
            className="cursor-pointer"
            alt="Reset zoom"
            width="24"
            height="24"
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
