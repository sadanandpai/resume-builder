import type { ReactNode } from 'react';
import { previewEditorTargets, useEditorStore } from '@/stores/useEditorStore';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';

/** Shared by preview sections and fixed profile/contact areas across templates. */
export function EditableResumeSection({ id, children }: { id: string; children: ReactNode }) {
  const isReorderMode = useSectionLayoutStore((state) => state.isReorderMode);
  const target = previewEditorTargets[id];
  const openEditor = useEditorStore((state) => state.openEditor);
  if (!target || isReorderMode) return <div className="relative">{children}</div>;

  return (
    <div
      className="relative cursor-pointer print:cursor-auto focus-visible:outline-2 focus-visible:outline-resume-500"
      role="button"
      tabIndex={0}
      aria-label={`Edit ${id === 'basics' ? 'name and contact details' : id.replaceAll('_', ' ')}`}
      onClick={(event) => {
        // Preserve real contact links while allowing the surrounding area to select the editor.
        if ((event.target as HTMLElement).closest('a, button, input')) return;
        openEditor(target);
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openEditor(target);
        }
      }}
    >
      {children}
    </div>
  );
}
