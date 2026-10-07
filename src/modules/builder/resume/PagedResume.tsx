import type { ReactNode } from 'react';
import { columns, sideString, styleVariables } from '@/helpers/resume-style/styles';
import { useTemplates } from '@/stores/useTemplate';
import { TEMPLATE_REGISTRY } from '@/templates/designs/registry/templates';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';

/** One fixed A4 page. Insets reduce its usable border-box, identically in print. */
export function PagedResume({ children }: { children: ReactNode }) {
  const settings = useResumeStyleStore((state) => state.settings);
  const templateId = useTemplates((state) => state.activeTemplate.id);
  const secondaryDefault = TEMPLATE_REGISTRY[templateId]?.style.secondaryColumnPercent;
  const variables = styleVariables(settings);
  if (
    secondaryDefault !== undefined &&
    (settings.spacing?.column !== undefined || settings.density)
  ) {
    Object.assign(variables, {
      '--resume-column-tracks': columns(
        '',
        ['sidebar-left', 'creative', 'straightforward'].includes(templateId),
        settings.secondaryColumnPercent ?? secondaryDefault
      ),
    });
  }
  return (
    <div className="resume-pages">
      <div
        className="resume-a4-page"
        role="region"
        aria-label="Resume page 1"
        style={{
          boxSizing: 'border-box',
          padding: settings.pageMargins ? sideString(settings.pageMargins, 'mm') : undefined,
        }}
      >
        <div className="resume-page-content" style={variables}>
          {children}
        </div>
      </div>
    </div>
  );
}
