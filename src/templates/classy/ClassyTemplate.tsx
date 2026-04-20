import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, SkillBar, formatDateRange } from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

const serif = "'Georgia', serif";

export default function ClassyTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '48px 56px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: serif, fontSize: 34, margin: 0, fontWeight: 400, color: p.text }}>
          {b.name}
        </h1>
        <div style={{ fontSize: 12, color: p.muted, marginTop: 8, letterSpacing: '0.12em' }}>
          {b.label}
        </div>
        <div style={{ fontSize: 10.5, color: p.muted, marginTop: 12 }}>
          {[b.email, b.phone, b.location?.city].filter(Boolean).join(' · ')}
        </div>
      </div>
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 20 }}>
          <div style={{ borderTop: `1px solid ${p.accent}`, paddingTop: 10, marginBottom: 12 }}>
            <SectionHeading title="Professional Experience" p={p} variant="caps" align="center" />
          </div>
          {data.work.map((w: any) => (
            <div key={w.id} style={{ marginBottom: 12 }}>
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
        <section style={{ marginBottom: 20 }}>
          <div style={{ borderTop: `1px solid ${p.accent}`, paddingTop: 10, marginBottom: 12 }}>
            <SectionHeading title="Education" p={p} variant="caps" align="center" />
          </div>
          {data.education.map((e: any) => (
            <div key={e.id} style={{ textAlign: 'center', fontSize: 10.5, marginBottom: 8 }}>
              <strong>{e.studyType}</strong> — {e.area}
              <div style={{ color: p.muted }}>{e.institution}</div>
            </div>
          ))}
        </section>
      </SectionValidator>
      <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
        <section>
          <div style={{ borderTop: `1px solid ${p.accent}`, paddingTop: 10, marginBottom: 12 }}>
            <SectionHeading title="Key Skills" p={p} variant="caps" align="center" />
          </div>
          {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
            <SkillBar key={i} name={s.name} level={s.level} p={p} />
          ))}
        </section>
      </SectionValidator>
    </div>
  );
}
