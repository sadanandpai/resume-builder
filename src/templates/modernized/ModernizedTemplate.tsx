import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, SkillBar, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette } from './resumePalette';

export default function ModernizedTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const side = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.85)',
    primary: '#fff',
    divider: 'rgba(255,255,255,0.25)',
    accent: p.accent,
    bg: p.sidebarBg,
  });

  return (
    <div style={{ ...pageStyle(p), display: 'grid', gridTemplateColumns: '1fr 36%' }}>
      <main style={{ padding: '30px 28px' }}>
        <SectionValidator value={data.work}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Professional Experience" p={p} variant="underline" />
            {data.work.map((w: any) => (
              <div key={w.id} style={{ marginBottom: 10 }}>
                <JobHeader
                  position={w.position}
                  company={w.name}
                  date={formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                  p={p}
                />
                <RichText html={w.summary} p={p} />
              </div>
            ))}
          </section>
        </SectionValidator>
        <SectionValidator value={data.education}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Education" p={p} variant="underline" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                <strong>{e.studyType}</strong> — {e.area}
                <div style={{ color: p.muted }}>{e.institution}</div>
              </div>
            ))}
          </section>
        </SectionValidator>
        <SectionValidator value={data.awards}>
          <section>
            <SectionHeading title="Certifications" p={p} variant="underline" />
            {data.awards.map((a: any) => (
              <div key={a.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
                {a.title} — {a.awarder}
              </div>
            ))}
          </section>
        </SectionValidator>
      </main>
      <aside style={{ background: p.sidebarBg, color: '#fff', padding: '28px 22px' }}>
        <H1 p={side} size={22} color="#fff">
          {b.name}
        </H1>
        <div style={{ fontSize: 11, opacity: 0.9, marginBottom: 16 }}>{b.label}</div>
        <SectionValidator value={b.summary}>
          <section style={{ marginBottom: 16 }}>
            <SectionHeading title="Summary" p={side} variant="line" />
            <RichText html={b.summary} p={side} />
          </section>
        </SectionValidator>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <section>
            <SectionHeading title="Key Skills" p={side} variant="line" />
            {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
              <SkillBar key={i} name={s.name} level={s.level} p={side} />
            ))}
          </section>
        </SectionValidator>
      </aside>
    </div>
  );
}
