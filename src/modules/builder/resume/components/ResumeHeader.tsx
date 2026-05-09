import { useTemplates } from '@/stores/useTemplate';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useZoom } from '@/stores/useZoom';
import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  const { zoomIn, zoomOut, resetZoom } = useZoom.getState();
  const activeTemplate = useTemplates((state) => state.activeTemplate);
  const isReorderMode = useSectionLayoutStore((state) => state.isReorderMode);
  const toggleReorderMode = useSectionLayoutStore((state) => state.toggleReorderMode);
  const resetTemplateLayout = useSectionLayoutStore((state) => state.resetTemplate);

  return (
    <div className="flex items-center justify-between">
      <ResumeTitle title={activeTemplate.name} />
      <ResumeController
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetZoom={resetZoom}
        isReorderMode={isReorderMode}
        onToggleReorder={toggleReorderMode}
        onResetLayout={() => resetTemplateLayout(activeTemplate.id)}
      />
    </div>
  );
};

export default ResumeHeader;
