import { useTemplates } from 'src/stores/useTemplate';
import { useZoom } from 'src/stores/useZoom';
import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  const { zoomIn, zoomOut, resetZoom } = useZoom.getState();
  const templateName = useTemplates((state) => state.activeTemplate.name);

  return (
    <div className="flex items-center justify-between">
      <ResumeTitle title={templateName} />
      <ResumeController zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} />
    </div>
  );
};

export default ResumeHeader;
