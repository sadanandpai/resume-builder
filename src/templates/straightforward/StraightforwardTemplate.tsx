import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, formatDateRange } from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette, withAlpha } from './resumePalette';

const serif = "'Georgia', 'Times New Roman', serif";

export default function StraightforwardTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const skills = data.skills.languages.concat(data.skills.frameworks, data.skills.tools);

  return (
    <div style={{ ...pageStyle(p), display: 'grid', gridTemplateColumns: '32% 1fr' }}>
      <aside
        style={{
          background: withAlpha(p.accent, 0.12),
          padding: '28px 20px',
          borderRight: `1px solid ${p.divider}`,
        }}
      >
        <SectionValidator value={data.education}>
          <section style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: serif, fontSize: 12, color: p.primary, margin: '0 0 8px 0' }}>
              Education
            </h3>
            {data.education.map((e: any) => (
              <div key={e.id} style={{ fontSize: 10.5, marginBottom: 8, lineHeight: 1.45 }}>
                <strong>{e.studyType}</strong>
                <div>{e.area}</div>
                <div style={{ color: p.muted }}>{e.institution}</div>
                <div style={{ color: p.muted }}>
                  {e.startDate}–{e.endDate}
                </div>
              </div>
            ))}
          </section>
        </SectionValidator>
        <SectionValidator value={skills}>
          <section style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: serif, fontSize: 12, color: p.primary, margin: '0 0 8px 0' }}>
              Key Skills
            </h3>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10.5 }}>
              {skills.map((s: any, i: number) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {s.name}
                </li>
              ))}
            </ul>
          </section>
        </SectionValidator>
        <SectionValidator value={data.awards}>
          <section>
            <h3 style={{ fontFamily: serif, fontSize: 12, color: p.primary, margin: '0 0 8px 0' }}>
              Certifications
            </h3>
            {data.awards.map((a: any) => (
              <div key={a.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                {a.title}
                <div style={{ color: p.muted }}>{a.awarder}</div>
              </div>
            ))}
          </section>
        </SectionValidator>
      </aside>
      <main style={{ padding: '28px 32px' }}>
        <h1 style={{ fontFamily: serif, fontSize: 28, margin: 0, color: p.primary }}>{b.name}</h1>
        <div style={{ fontSize: 12, color: p.muted, marginTop: 4 }}>{b.label}</div>
        <div style={{ fontSize: 10.5, marginTop: 8, color: p.text }}>
          {[b.email, b.phone, b.location?.city].filter(Boolean).join(' · ')}
        </div>
        <SectionValidator value={b.summary}>
          <section style={{ marginTop: 18, marginBottom: 14 }}>
            <SectionHeading title="Summary" p={p} variant="line" />
            <RichText html={b.summary} p={p} />
          </section>
        </SectionValidator>
        <SectionValidator value={data.work}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Professional Experience" p={p} variant="line" />
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
        <SectionValidator value={data.activities?.involvements}>
          <section>
            <SectionHeading title="Academic Projects" p={p} variant="line" />
            <RichText html={data.activities.involvements} p={p} />
          </section>
        </SectionValidator>
      </main>
    </div>
  );
}
