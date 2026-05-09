import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';

import type { ResumePalette } from '@/templates/common/resumePalette';

export const RichText = ({ html, p }: { html: string; p: ResumePalette }) => {
  return (
    <div style={{ color: p.text, fontSize: 11, lineHeight: 1.5, fontFamily: p.bodyFont }}>
      <HTMLRenderer htmlString={html} />
    </div>
  );
};
