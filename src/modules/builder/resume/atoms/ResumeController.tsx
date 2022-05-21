import Image from 'next/image';

const ResumeController = ({ zoomIn, zoomOut }: { zoomIn: () => void; zoomOut: () => void }) => {
  return (
    <div className="grid grid-cols-3 items-center gap-6 ">
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
        src="/icons/full-screen.svg"
        className="cursor-pointer"
        alt="Fullscreen"
        width="24px"
        height="24px"
      />
    </div>
  );
};

export default ResumeController;
