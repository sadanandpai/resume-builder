import type { ReactNode } from 'react';

/** One fixed A4 page, with identical clipping in preview and print. */
export function PagedResume({ children }: { children: ReactNode }) {
  return (
    <div className="resume-pages">
      <div className="resume-a4-page" role="region" aria-label="Resume page 1">
        <div className="resume-page-content">{children}</div>
      </div>
    </div>
  );
}
