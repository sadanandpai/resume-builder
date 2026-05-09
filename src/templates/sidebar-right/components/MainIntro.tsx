import { H1, Label } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

type Basics = { name: string; label: string };

export function MainIntro({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <>
      <H1 p={p} size={28}>
        {basics.name}
      </H1>
      <Label p={p}>{basics.label}</Label>
      <div
        style={{
          height: 3,
          width: 56,
          background: p.accent,
          margin: '12px 0 18px 0',
        }}
      />
    </>
  );
}
