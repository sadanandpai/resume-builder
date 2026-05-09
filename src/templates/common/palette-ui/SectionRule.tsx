import type { ResumePalette } from '@/templates/common/resumePalette';

export const SectionRule = ({
  p,
  thick,
  color,
}: {
  p: ResumePalette;
  thick?: boolean;
  color?: string;
}) => (
  <hr
    style={{
      border: 'none',
      borderTop: `${thick ? 3 : 1}px solid ${color || p.primary}`,
      margin: '12px 0',
      opacity: thick ? 1 : 0.85,
    }}
  />
);
