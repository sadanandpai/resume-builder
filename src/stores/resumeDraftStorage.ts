// One browser draft: section stores remain independent in memory, but persistence
// uses a draft document and a separate saved snapshot. Never persist edit codes here.
export const DRAFT_KEY = 'resume-draft';
type Draft = {
  version: 1;
  resumeId: string | null;
  current: Record<string, unknown>;
};
const legacyKeys = [
  'basic',
  'experience',
  'education',
  'awards',
  'activities',
  'volunteering',
  'languages',
  'frameworks',
  'technologies',
  'libraries',
  'databases',
  'practices',
  'tools',
  'themes',
  'resumeSectionLayouts',
  'resumeStyles',
  'resumeSectionTitles',
  'selectedTemplateId',
];
const empty = (): Draft => ({ version: 1, resumeId: null, current: {} });
export function readDraft(): Draft {
  try {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    const current = draft?.data ?? draft?.current;
    if (draft?.version === 1 && current && typeof current === 'object' && !Array.isArray(current)) {
      const result: Draft = { version: 1, resumeId: draft.resumeId ?? null, current };
      // Migrate the previous combined document without dropping either snapshot.
      try {
        if (draft.current) {
          if (draft.baseline && result.resumeId) {
            localStorage.setItem(
              savedResumeKey(result.resumeId),
              JSON.stringify({ version: 1, data: draft.baseline })
            );
          }
          writeDraft(result);
        }
      } catch {
        /* Retain the old document if migration cannot be persisted. */
      }
      return result;
    }
  } catch {
    /* Keep editing available with blocked or malformed storage. */
  }
  const draft = empty();
  try {
    for (const key of legacyKeys) {
      const raw = localStorage.getItem(key);
      if (raw === null) continue;
      try {
        draft.current[key] = JSON.parse(raw);
      } catch {
        draft.current[key] = raw;
      }
    }
    if (Object.keys(draft.current).length) {
      if (writeDraft(draft)) for (const key of legacyKeys) localStorage.removeItem(key);
    }
  } catch {
    /* Migration must not prevent editing. */
  }
  return draft;
}
export const savedResumeKey = (id: string) => `resume-${id}`;
function writeDraft(draft: Draft): boolean {
  try {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ version: 1, resumeId: draft.resumeId, data: draft.current })
    );
    return true;
  } catch {
    /* Keep in-memory edits. */
    return false;
  }
}
export function readDraftBaseline(id: string): Record<string, unknown> | undefined {
  try {
    const saved = JSON.parse(localStorage.getItem(savedResumeKey(id)) || 'null');
    if (
      saved?.version === 1 &&
      saved.data &&
      typeof saved.data === 'object' &&
      !Array.isArray(saved.data)
    )
      return saved.data;
  } catch {
    /* Missing or malformed snapshots cannot be restored. */
  }
}
export const draftStorage = {
  getItem(name: string): string | null {
    const draft = readDraft();
    if (Object.hasOwn(draft.current, name)) {
      const value = draft.current[name];
      return typeof value === 'string' ? value : JSON.stringify(value);
    }
    return null;
  },
  setItem(name: string, value: string) {
    const draft = readDraft();
    let parsed: unknown = value;
    try {
      parsed = JSON.parse(value);
    } catch {
      /* Template IDs are plain strings. */
    }
    draft.current[name] = parsed;
    const persisted = writeDraft(draft);
    try {
      // Remove a legacy key only after its replacement has been persisted.
      if (persisted) localStorage.removeItem(name);
    } catch {
      /* Storage may be unavailable. */
    }
  },
  removeItem(name: string) {
    const draft = readDraft();
    delete draft.current[name];
    writeDraft(draft);
    try {
      localStorage.removeItem(name);
    } catch {
      /* Storage may be unavailable. */
    }
  },
};
export function saveDraftBaseline(id: string, current = readDraft().current) {
  const draft = readDraft();
  try {
    localStorage.setItem(savedResumeKey(id), JSON.stringify({ version: 1, data: current }));
    if (writeDraft({ ...draft, resumeId: id }) && draft.resumeId && draft.resumeId !== id) {
      localStorage.removeItem(savedResumeKey(draft.resumeId));
    }
  } catch {
    /* Keep editing available when storage is unavailable. */
  }
}
export function replaceDraftCurrent(id: string, current: Record<string, unknown>): boolean {
  const draft = readDraft();
  if (draft.resumeId !== id) return false;
  return writeDraft({ ...draft, current });
}
export function restoreDraftBaseline(id: string): boolean {
  const baseline = readDraftBaseline(id);
  if (!baseline) return false;
  return replaceDraftCurrent(id, baseline);
}
export function detachDraft() {
  const draft = readDraft();
  if (writeDraft({ version: 1, resumeId: null, current: draft.current }) && draft.resumeId) {
    try {
      localStorage.removeItem(savedResumeKey(draft.resumeId));
    } catch {
      /* Storage may be unavailable. */
    }
  }
}
