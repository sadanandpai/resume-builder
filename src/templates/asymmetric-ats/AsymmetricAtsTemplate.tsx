import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function AsymmetricAtsTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const skillLines = data.skills.languages.concat(
    data.skills.frameworks,
    data.skills.technologies,
    data.skills.tools,
    data.skills.practices
  );

  return (
    <div
      style={{
        ...pageStyle(p),
        display: 'grid',
        gridTemplateColumns: '1fr 30%',
        gap: 20,
        padding: '30px 32px',
      }}
    >
      <main>
        <H1 p={p} size={24}>
          {b.name}
        </H1>
        <div style={{ fontSize: 11, color: p.primary, fontWeight: 600, marginBottom: 16 }}>
          {b.label}
        </div>
        <SectionValidator value={b.summary}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Profile" p={p} variant="bar" />
            <RichText html={b.summary} p={p} />
          </section>
        </SectionValidator>
        <SectionValidator value={data.work}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Employment History" p={p} variant="bar" />
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
                <strong>{e.studyType}</strong> — {e.area}
                <div style={{ color: p.muted }}>{e.institution}</div>
              </div>
            ))}
          </section>
        </SectionValidator>
      </main>
      <aside style={{ borderLeft: `1px solid ${p.divider}`, paddingLeft: 16 }}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Details" p={p} variant="bar" />
          <div style={{ fontSize: 10, lineHeight: 1.6 }}>
            {b.email && <div>{b.email}</div>}
            {b.phone && <div>{b.phone}</div>}
            {b.location?.city && <div>{b.location.city}</div>}
            {b.url && <div>{b.url}</div>}
          </div>
        </section>
        <SectionValidator value={skillLines}>
          <section>
            <SectionHeading title="Skills" p={p} variant="bar" />
            <ul style={{ margin: 0, paddingLeft: 14, fontSize: 9.5, lineHeight: 1.45 }}>
              {skillLines.map((s: any, i: number) => (
                <li key={i} style={{ marginBottom: 3 }}>
                  {s.name}
                </li>
              ))}
            </ul>
          </section>
        </SectionValidator>
      </aside>
    </div>
  );
}
