import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function SimpleAtsTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const allSkills = data.skills.languages
    .concat(data.skills.frameworks, data.skills.technologies, data.skills.tools)
    .map((x: { name: string }) => x.name);

  const colSize = Math.ceil(allSkills.length / 3) || 1;
  const cols = [0, 1, 2].map((c) => allSkills.slice(c * colSize, (c + 1) * colSize));

  return (
    <div style={{ ...pageStyle(p), padding: '32px 40px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
        }}
      >
        <div>
          <H1 p={p} size={26}>
            {b.name}
          </H1>
          <div style={{ fontSize: 12, color: p.primary, fontWeight: 600 }}>{b.label}</div>
        </div>
        <div style={{ fontSize: 10, color: p.text, textAlign: 'right', lineHeight: 1.5 }}>
          {b.email && <div>{b.email}</div>}
          {b.phone && <div>{b.phone}</div>}
          {b.location?.city && <div>{b.location.city}</div>}
        </div>
      </header>
      <SectionValidator value={b.summary}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Summary" p={p} variant="underline" />
          <RichText html={b.summary} p={p} />
        </section>
      </SectionValidator>
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
              <strong>{e.studyType}</strong> — {e.area}, {e.institution} ({e.startDate}–{e.endDate})
            </div>
          ))}
        </section>
      </SectionValidator>
      {allSkills.length > 0 && (
        <section>
          <SectionHeading title="Areas of Expertise" p={p} variant="underline" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              fontSize: 10.5,
            }}
          >
            {cols.map((col, ci) => (
              <ul key={ci} style={{ margin: 0, paddingLeft: 18 }}>
                {col.map((name: string, ni: number) => (
                  <li key={`${name}-${ni}`} style={{ marginBottom: 4 }}>
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
