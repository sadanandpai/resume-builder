'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ReactNode, useCallback, useLayoutEffect, useRef } from 'react';
import {
  computeRegionsAfterDrag,
  regionLayoutsEqual,
} from '@/helpers/section-layout/computeRegionsAfterDrag';

type Props = {
  regionKeys: string[];
  regions: Record<string, string[]>;
  dragEnabled?: boolean;
  onDragOverRegions?: (next: Record<string, string[]> | null) => void;
  onDragEndRegions: (next: Record<string, string[]>) => void;
  children: ReactNode;
};

/**
 * DragOverlay renders outside the scaled resume preview so the cursor-aligned preview
 * is not distorted by CSS `transform: scale(zoom)`. In-list drag ghosts are hidden
 * (see SortableTemplateSection) and replaced by a simple solid preview box.
 */
const resumeSectionCollision: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args);
  if (pointerHits.length > 0) {
    return pointerHits;
  }
  return closestCorners(args);
};

export function ResumeSectionDndProvider({
  regionKeys,
  regions,
  dragEnabled = false,
  onDragOverRegions,
  onDragEndRegions,
  children,
}: Props) {
  const regionsRef = useRef(regions);
  const projectedRef = useRef<Record<string, string[]> | null>(null);
  useLayoutEffect(() => {
    regionsRef.current = regions;
  }, [regions]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = useCallback(() => {
    projectedRef.current = null;
    onDragOverRegions?.(null);
  }, [onDragOverRegions]);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      if (!dragEnabled) return;
      const { active, over } = event;
      if (!over) {
        projectedRef.current = null;
        onDragOverRegions?.(null);
        return;
      }
      const overData = over.data.current as
        | { resumeRegion?: string; regionId?: string }
        | undefined;
      const overSortableRegionId = overData?.resumeRegion ?? overData?.regionId;
      const base = projectedRef.current ?? regionsRef.current;
      const next = computeRegionsAfterDrag(
        base,
        regionKeys,
        String(active.id),
        String(over.id),
        overSortableRegionId
      );
      if (!next) return;

      const prevProjected = projectedRef.current;
      const persisted = regionsRef.current;

      if (prevProjected && regionLayoutsEqual(prevProjected, next, regionKeys)) {
        return;
      }
      if (!prevProjected && regionLayoutsEqual(persisted, next, regionKeys)) {
        return;
      }
      if (regionLayoutsEqual(persisted, next, regionKeys)) {
        projectedRef.current = null;
        onDragOverRegions?.(null);
        return;
      }

      projectedRef.current = next;
      onDragOverRegions?.(next);
    },
    [dragEnabled, onDragOverRegions, regionKeys]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const projected = projectedRef.current;
      projectedRef.current = null;
      onDragOverRegions?.(null);
      if (!dragEnabled || !over) return;
      const latest = projected ?? regionsRef.current;
      const overData = over.data.current as
        | { resumeRegion?: string; regionId?: string }
        | undefined;
      const overSortableRegionId = overData?.resumeRegion ?? overData?.regionId;
      const next = computeRegionsAfterDrag(
        latest,
        regionKeys,
        String(active.id),
        String(over.id),
        overSortableRegionId
      );
      if (next) {
        onDragEndRegions(next);
        return;
      }
      if (projected) onDragEndRegions(projected);
    },
    [dragEnabled, onDragOverRegions, regionKeys, onDragEndRegions]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={resumeSectionCollision}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={() => {
        projectedRef.current = null;
        onDragOverRegions?.(null);
      }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}
