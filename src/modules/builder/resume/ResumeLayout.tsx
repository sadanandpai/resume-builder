import {
  Context,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { getAllowedSectionIdsForTemplate } from '@/helpers/section-layout/allowedSections';
import { ResumeSectionDndProvider } from '@/helpers/section-layout/ResumeSectionDndProvider';
import { SectionLayoutRuntimeContext } from '@/helpers/section-layout/SectionLayoutRuntimeContext';
import { useTemplateSectionLayout } from '@/helpers/section-layout/useTemplateSectionLayout';
import { ThemeProvider } from '@mui/material/styles';
import { useResumeStore } from '@/stores/useResumeStore';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useZoom, ZOOM_MIN } from '@/stores/useZoom';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';

// TODO: need to define types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StateContext: Context<any> = createContext(null);

function ResumeSectionLayoutShell({
  templateId,
  resumeData,
  children,
}: {
  templateId: string;
  resumeData: ReturnType<typeof useResumeStore>;
  children: ReactNode;
}) {
  const allowed = useMemo(
    () => getAllowedSectionIdsForTemplate(templateId, resumeData),
    [templateId, resumeData]
  );
  const { regions, setRegions, regionKeys } = useTemplateSectionLayout(templateId, allowed);
  const isReorderMode = useSectionLayoutStore((state) => state.isReorderMode);
  const [projectedRegions, setProjectedRegions] = useState<Record<string, string[]> | null>(null);
  const effectiveRegions = isReorderMode && projectedRegions ? projectedRegions : regions;

  return (
    <ResumeSectionDndProvider
      regionKeys={regionKeys}
      regions={regions}
      dragEnabled={isReorderMode}
      onDragOverRegions={setProjectedRegions}
      onDragEndRegions={setRegions}
    >
      <SectionLayoutRuntimeContext.Provider value={{ regions: effectiveRegions, regionKeys }}>
        {children}
      </SectionLayoutRuntimeContext.Provider>
    </ResumeSectionDndProvider>
  );
}

/** ~210mm at 96dpi — matches resume preview width used for scale-to-fit on small screens. */
const RESUME_PAGE_WIDTH_PX = 794;

export const ResumeLayout = ({ pauseFitToWidth = false }: { pauseFitToWidth?: boolean }) => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);
  const setZoom = useZoom((state) => state.setZoom);
  const fitContainerRef = useRef<HTMLDivElement>(null);

  const templateId = useTemplates((state) => state.activeTemplate.id);
  const Template = AVAILABLE_TEMPLATES[templateId].component;
  const selectedTheme = useThemes((state) => state.selectedTheme);

  useEffect(() => {
    const selectedTemplateId =
      localStorage.getItem('selectedTemplateId') || AVAILABLE_TEMPLATES['modern'].id;
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[selectedTemplateId]);
  }, []);

  useEffect(() => {
    const el = fitContainerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const mq = window.matchMedia('(min-width: 1024px)');
    let timeoutId: number | undefined;

    const applyFit = () => {
      if (mq.matches || pauseFitToWidth) return;
      const w = el.clientWidth;
      if (w <= 0) return;
      const fit = Math.min(1, Math.max(ZOOM_MIN, w / RESUME_PAGE_WIDTH_PX));
      setZoom(fit);
    };

    const schedule = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(applyFit, 120);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    mq.addEventListener('change', schedule);
    schedule();

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      ro.disconnect();
      mq.removeEventListener('change', schedule);
    };
  }, [setZoom, pauseFitToWidth]);

  return (
    <div ref={fitContainerRef} className="mx-5 print:mx-0 mb-2 print:mb-0">
      <div
        style={{ transform: `scale(${zoom})` }}
        className="resume-print-scale-wrap origin-top transition-all duration-300 ease-linear"
      >
        <div className="w-[210mm] h-[296mm] bg-white my-0 mx-auto">
          <StateContext.Provider value={resumeData}>
            <ThemeProvider theme={selectedTheme}>
              <ResumeSectionLayoutShell templateId={templateId} resumeData={resumeData}>
                {Template && <Template />}
              </ResumeSectionLayoutShell>
            </ThemeProvider>
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
