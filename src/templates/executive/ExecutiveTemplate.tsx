import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function ExecutiveTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '44px 56px' }}>
      <div style={{ textAlign: 'center' }}>
        <H1 p={p} size={32}>
          {b.name.toUpperCase()}
        </H1>
        <div
          style={{
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontSize: 11,
            color: p.muted,
            marginTop: 6,
          }}
        >
          {b.label}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
            marginTop: 10,
            fontSize: 10.5,
            color: p.text,
            flexWrap: 'wrap',
          }}
        >
          {b.phone && <span>{b.phone}</span>}
          {b.email && <span>·</span>}
          {b.email && <span>{b.email}</span>}
          {b.location?.city && <span>·</span>}
          {b.location?.city && <span>{b.location.city}</span>}
          {b.url && <span>·</span>}
          {b.url && <span>{b.url}</span>}
        </div>
      </div>
      <hr style={{ border: 'none', borderTop: `1px solid ${p.primary}`, margin: '18px 0' }} />
      <SectionValidator value={b.summary}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Executive Summary" p={p} variant="line" align="center" />
          <RichText html={b.summary} p={p} />
        </section>
      </SectionValidator>
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Professional Experience" p={p} variant="line" align="center" />
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <SectionValidator value={data.education}>
          <section>
            <SectionHeading title="Education" p={p} variant="line" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>
                  {e.studyType} · {e.area}
                </div>
                <div style={{ color: p.muted, fontSize: 10.5 }}>
                  {e.institution} — {e.startDate}–{e.endDate}
                </div>
              </div>
            ))}
          </section>
        </SectionValidator>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <section>
            <SectionHeading title="Core Competencies" p={p} variant="line" />
            <ChipList
              items={data.skills.languages.concat(data.skills.frameworks, data.skills.practices)}
              p={p}
              variant="outline"
            />
          </section>
        </SectionValidator>
      </div>
    </div>
  );
}
