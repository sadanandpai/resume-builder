import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { SectionHeading } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

export function Awards({ awards, p }: { awards: any[]; p: ResumePalette }) {
  return (
    <SectionValidator value={awards}>
      <section>
        <SectionHeading title="Certifications" p={p} variant="underline" />
        {awards.map((a: any) => (
          <div key={a.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
            {a.title} — {a.awarder}
          </div>
        ))}
      </section>
    </SectionValidator>
  );
}
