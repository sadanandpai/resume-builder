import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ProfileAvatar, RichText, SectionHeading, formatDateRange } from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

const serif = "'Georgia', serif";

export default function CorporateTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const skills = data.skills.languages.concat(data.skills.frameworks, data.skills.tools);

  return (
    <div style={{ ...pageStyle(p), padding: '32px 36px' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <ProfileAvatar src={b.image} size={72} />
        <h1 style={{ fontFamily: serif, fontSize: 26, margin: '12px 0 0 0', color: p.text }}>
          {b.name}
        </h1>
        <div style={{ fontSize: 11, color: p.muted }}>{b.label}</div>
        <div style={{ fontSize: 10, color: p.muted, marginTop: 6 }}>{b.location?.city}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '32% 1fr', gap: 24 }}>
        <aside style={{ borderRight: `1px solid ${p.divider}`, paddingRight: 16 }}>
          <section style={{ marginBottom: 14 }}>
            <h3 style={{ fontFamily: serif, fontSize: 11, margin: '0 0 8px 0', color: p.primary }}>
              Details
            </h3>
            <div style={{ fontSize: 10, lineHeight: 1.6 }}>
              {b.email && <div>{b.email}</div>}
              {b.phone && <div>{b.phone}</div>}
              {b.url && <div>{b.url}</div>}
            </div>
          </section>
          <SectionValidator value={skills}>
            <section style={{ marginBottom: 14 }}>
              <h3
                style={{ fontFamily: serif, fontSize: 11, margin: '0 0 8px 0', color: p.primary }}
              >
                Skills
              </h3>
              {skills.map((s: any, i: number) => (
                <div
                  key={i}
                  style={{
                    fontSize: 10.5,
                    marginBottom: 6,
                    borderBottom: `1px solid ${p.divider}`,
                    paddingBottom: 4,
                  }}
                >
                  {s.name}
                </div>
              ))}
            </section>
          </SectionValidator>
        </aside>
        <main>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Profile" p={p} variant="bar" />
              <RichText html={b.summary} p={p} />
            </section>
          </SectionValidator>
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Work Experience" p={p} variant="bar" />
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
      </div>
    </div>
  );
}
