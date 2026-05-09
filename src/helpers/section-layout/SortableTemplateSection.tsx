'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode, useContext } from 'react';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { getSectionDisplayName } from '@/helpers/section-layout/sectionLabels';
import { ResumeSortableRegionContext } from '@/helpers/section-layout/SortableRegion';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';

export function SortableTemplateSection({ id, children }: { id: string; children: ReactNode }) {
  const regionId = useContext(ResumeSortableRegionContext);
  const isReorderMode = useSectionLayoutStore((state) => state.isReorderMode);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isReorderMode,
    data: { resumeRegion: regionId },
  });

  const sectionName = getSectionDisplayName(id);

  // While dragging, the real node stays as layout placeholder only; DragOverlay shows preview.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isReorderMode) {
    return <div className="relative">{children}</div>;
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative my-2">
      <div className="print:hidden">
        <button
          type="button"
          className={`w-full cursor-grab touch-none rounded-md border border-[#1890ff]/35 bg-[#1890ff]/8 px-3 py-3 text-left text-sm font-medium text-resume-700 transition-colors hover:border-[#1890ff] hover:bg-[#1890ff]/12 active:cursor-grabbing ${
            isDragging
              ? 'border-dashed border-[#1890ff]/70 bg-[#1890ff]/12 text-resume-500'
              : 'shadow-sm'
          }`}
          aria-label={`Drag to reorder ${sectionName}`}
          {...attributes}
          {...listeners}
        >
          <span className="flex items-center gap-2">
            <RxDragHandleDots2 size={16} aria-hidden />
            {sectionName}
          </span>
        </button>
      </div>
      {/* If print runs before reorder state flips off, still output real section content */}
      <div className="hidden print:block relative">{children}</div>
    </div>
  );
}
