import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ContactBlock, RichText, SectionHeading, SkillBar, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette } from './resumePalette';

export default function SleekTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const block = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.88)',
    primary: '#fff',
    divider: 'rgba(255,255,255,0.2)',
    accent: p.accent,
  });

  return (
    <div
      style={{
        ...pageStyle(p),
        display: 'grid',
        gridTemplateColumns: '1fr 38%',
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <div />
      <div style={{ background: p.primary, color: '#fff', padding: '20px 24px' }}>
        <H1 p={block} size={24} color="#fff">
          {b.name}
        </H1>
        <div style={{ fontSize: 11, opacity: 0.95 }}>{b.label}</div>
      </div>
      <main style={{ padding: '24px 28px', gridRow: 2, gridColumn: '1 / 2' }}>
        <SectionValidator value={data.work}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Professional Experience" p={p} variant="bar" />
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
          <section>
            <SectionHeading title="Education" p={p} variant="bar" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                <strong>{e.studyType}</strong> — {e.area}, {e.institution}
              </div>
            ))}
          </section>
        </SectionValidator>
      </main>
      <aside
        style={{
          padding: '24px 22px',
          gridRow: 2,
          gridColumn: '2 / 3',
          borderLeft: `1px solid ${p.divider}`,
        }}
      >
        <SectionValidator value={b.summary}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Summary" p={p} variant="bar" />
            <RichText html={b.summary} p={p} />
          </section>
        </SectionValidator>
        <section style={{ marginBottom: 12 }}>
          <SectionHeading title="Contact" p={p} variant="bar" />
          <ContactBlock email={b.email} phone={b.phone} city={b.location?.city} url={b.url} />
        </section>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <section>
            <SectionHeading title="Key Skills" p={p} variant="bar" />
            {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
              <SkillBar key={i} name={s.name} level={s.level} p={p} />
            ))}
          </section>
        </SectionValidator>
      </aside>
    </div>
  );
}
