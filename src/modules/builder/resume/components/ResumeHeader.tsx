import { useZoom } from 'src/stores/useZoom';
import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  const { zoomIn, zoomOut } = useZoom.getState();

  return (
    <div className="flex items-center justify-between">
      <ResumeTitle title="Modern Resume" />
      <ResumeController zoomIn={zoomIn} zoomOut={zoomOut} />
    </div>
  );
};

export default ResumeHeader;
