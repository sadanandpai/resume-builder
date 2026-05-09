/**
 * Merges persisted per-region section order with the set of sections that currently
 * have content (`allowed`) and template defaults so every allowed id appears exactly once.
 */
export function normalizeRegionLayout(
  stored: Record<string, string[]> | undefined,
  allowed: Set<string>,
  defaults: Record<string, string[]>,
  regionKeys: string[]
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const r of regionKeys) {
    result[r] = [];
  }

  if (!stored) {
    for (const r of regionKeys) {
      result[r] = (defaults[r] ?? []).filter((id) => allowed.has(id));
    }
    assignMissingIds(result, allowed, defaults, regionKeys);
    return result;
  }

  const placed = new Set<string>();
  for (const r of regionKeys) {
    for (const id of stored[r] ?? []) {
      if (allowed.has(id) && !placed.has(id)) {
        result[r].push(id);
        placed.add(id);
      }
    }
  }
  for (const r of regionKeys) {
    for (const id of defaults[r] ?? []) {
      if (allowed.has(id) && !placed.has(id)) {
        result[r].push(id);
        placed.add(id);
      }
    }
  }
  assignMissingIds(result, allowed, defaults, regionKeys);
  return result;
}

function assignMissingIds(
  result: Record<string, string[]>,
  allowed: Set<string>,
  defaults: Record<string, string[]>,
  regionKeys: string[]
) {
  const placed = new Set(Object.values(result).flat());
  for (const id of allowed) {
    if (!placed.has(id)) {
      const home = regionKeys.find((r) => (defaults[r] ?? []).includes(id)) ?? regionKeys[0];
      result[home].push(id);
      placed.add(id);
    }
  }
}
