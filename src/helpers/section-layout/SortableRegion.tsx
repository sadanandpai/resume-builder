'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createContext, ReactNode } from 'react';
import { REGION_DROP_PREFIX } from '@/helpers/section-layout/computeRegionsAfterDrag';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';

/** Lets each `SortableTemplateSection` tag @dnd-kit data with the correct column for cross-region drops. */
export const ResumeSortableRegionContext = createContext<string>('');

export function SortableRegion({
  regionId,
  items,
  className,
  style,
  children,
}: {
  regionId: string;
  items: string[];
  className?: string;
  style?: React.CSSProperties;
  children: (sectionId: string) => ReactNode;
}) {
  const isReorderMode = useSectionLayoutStore((state) => state.isReorderMode);
  const { setNodeRef, isOver } = useDroppable({
    id: `${REGION_DROP_PREFIX}${regionId}`,
    data: { type: 'ResumeSectionRegion', regionId, resumeRegion: regionId },
  });

  return (
    <ResumeSortableRegionContext.Provider value={regionId}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={className}
          style={{
            ...style,
            minHeight: items.length === 0 ? 40 : undefined,
          }}
        >
          {items.map((id) => children(id))}
          {items.length === 0 && isReorderMode && (
            <p
              className={`print:hidden rounded-md border border-dashed px-3 py-3 text-center text-xs ${
                isOver
                  ? 'border-[#1890ff] bg-[#1890ff]/8 text-[#1890ff]'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              Drop sections here
            </p>
          )}
        </div>
      </SortableContext>
    </ResumeSortableRegionContext.Provider>
  );
}
