import { arrayMove } from '@dnd-kit/sortable';

export const REGION_DROP_PREFIX = '__resume_drop__';

/** Avoids spurious React updates during drag when collision jitter repeats the same layout. */
export function regionLayoutsEqual(
  a: Record<string, string[]>,
  b: Record<string, string[]>,
  regionKeys: string[]
): boolean {
  for (const k of regionKeys) {
    const aa = a[k] ?? [];
    const bb = b[k] ?? [];
    if (aa.length !== bb.length) return false;
    for (let i = 0; i < aa.length; i++) {
      if (aa[i] !== bb[i]) return false;
    }
  }
  return true;
}

export function isRegionDropId(id: string): boolean {
  return id.startsWith(REGION_DROP_PREFIX);
}

export function regionIdFromDropId(id: string): string {
  return id.slice(REGION_DROP_PREFIX.length);
}

function findContainer(
  itemId: string,
  regions: Record<string, string[]>,
  regionKeys: string[]
): string | undefined {
  for (const k of regionKeys) {
    if (regions[k]?.includes(itemId)) return k;
  }
  return undefined;
}

export function computeRegionsAfterDrag(
  regions: Record<string, string[]>,
  regionKeys: string[],
  activeId: string,
  overId: string,
  /** Set on each sortable via useSortable `data` so column is correct even when collision rects overlap. */
  overSortableRegionId?: string
): Record<string, string[]> | null {
  if (activeId === overId && !isRegionDropId(overId)) {
    return null;
  }

  const activeContainer = findContainer(activeId, regions, regionKeys);
  let overContainer: string | undefined;
  if (isRegionDropId(overId)) {
    const rid = regionIdFromDropId(overId);
    overContainer = regionKeys.includes(rid) ? rid : undefined;
  } else if (overSortableRegionId && regionKeys.includes(overSortableRegionId)) {
    overContainer = overSortableRegionId;
  } else {
    overContainer = findContainer(overId, regions, regionKeys);
  }

  if (!activeContainer || !overContainer) return null;

  if (activeContainer === overContainer) {
    const items = regions[activeContainer];
    const oldIndex = items.indexOf(activeId);
    if (oldIndex === -1) return null;
    if (isRegionDropId(overId)) return null;
    const newIndex = items.indexOf(overId);
    if (newIndex === -1 || oldIndex === newIndex) return null;
    return { ...regions, [activeContainer]: arrayMove(items, oldIndex, newIndex) };
  }

  const sourceItems = [...regions[activeContainer]];
  const destItems = [...regions[overContainer]];
  const fromIndex = sourceItems.indexOf(activeId);
  if (fromIndex === -1) return null;
  sourceItems.splice(fromIndex, 1);

  let newIndex: number;
  if (isRegionDropId(overId)) {
    newIndex = destItems.length;
  } else {
    const overIndex = destItems.indexOf(overId);
    newIndex = overIndex === -1 ? destItems.length : overIndex;
  }
  destItems.splice(newIndex, 0, activeId);

  return {
    ...regions,
    [activeContainer]: sourceItems,
    [overContainer]: destItems,
  };
}
