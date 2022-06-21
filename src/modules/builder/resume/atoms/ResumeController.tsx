import Image from 'next/image';

const ResumeController = ({ zoomIn, zoomOut }: { zoomIn: () => void; zoomOut: () => void }) => {
  return (
    <div className="flex">
      <div className="flex items-center block pr-4">
        <Image
          src="/icons/fit-height.svg"
          className="cursor-pointer"
          alt="Fit height"
          width="24px"
          height="24px"
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-5 pl-4 border-l-2	border-resume-200">
        <Image
          src="/icons/zoom-in.svg"
          className="cursor-pointer"
          alt="Zoom in"
          width="24px"
          height="24px"
          onClick={zoomIn}
        />
        <Image
          src="/icons/zoom-out.svg"
          className="cursor-pointer"
          alt="Zoom out"
          width="24px"
          height="24px"
          onClick={zoomOut}
        />
        <Image
          src="/icons/reset-zoom.svg"
          className="cursor-pointer"
          alt="Reset zoom"
          width="24px"
          height="24px"
        />
      </div>
    </div>
  );
};

export default ResumeController;
