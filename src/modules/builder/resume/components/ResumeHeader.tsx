import { useTemplates } from '@/stores/useTemplate';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useZoom } from '@/stores/useZoom';
import { useShallow } from 'zustand/react/shallow';
import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  const { zoomIn, zoomOut, resetZoom } = useZoom.getState();
  const activeTemplate = useTemplates((state) => state.activeTemplate);
  const { isReorderMode, toggleReorderMode, resetTemplateLayout } = useSectionLayoutStore(
    useShallow((state) => ({
      isReorderMode: state.isReorderMode,
      toggleReorderMode: state.toggleReorderMode,
      resetTemplateLayout: state.resetTemplate,
    }))
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
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
