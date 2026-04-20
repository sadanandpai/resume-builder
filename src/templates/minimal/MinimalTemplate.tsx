import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function MinimalTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '56px 64px' }}>
      <H1 p={p} size={34}>
        {b.name}
      </H1>
      <div style={{ fontSize: 13, color: p.muted, marginTop: 4 }}>{b.label}</div>
      <div
        style={{
          marginTop: 10,
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 10.5,
          color: p.muted,
        }}
      >
        {b.phone && <span>{b.phone}</span>}
        {b.email && <span>{b.email}</span>}
        {b.location?.city && <span>{b.location.city}</span>}
        {b.url && <span>{b.url}</span>}
      </div>
      <hr style={{ border: 'none', borderTop: `1px solid ${p.divider}`, margin: '22px 0' }} />
      <SectionValidator value={b.summary}>
        <section style={{ marginBottom: 18 }}>
          <SectionHeading title="Profile" p={p} variant="caps" />
          <RichText html={b.summary} p={p} />
        </section>
      </SectionValidator>
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 18 }}>
          <SectionHeading title="Experience" p={p} variant="caps" />
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <SectionValidator value={data.education}>
          <section>
            <SectionHeading title="Education" p={p} variant="caps" />
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
            <SectionHeading title="Skills" p={p} variant="caps" />
            <ChipList
              items={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
              p={p}
              variant="outline"
            />
          </section>
        </SectionValidator>
      </div>
    </div>
  );
}
