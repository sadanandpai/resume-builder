import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, formatDateRange } from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

const serif = "'Georgia', 'Times New Roman', serif";

export default function PrecisionAtsTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const skillNames = data.skills.languages
    .concat(data.skills.frameworks, data.skills.technologies, data.skills.tools)
    .map((x: { name: string }) => x.name);
  const skillsLine = skillNames.join(' · ');

  return (
    <div style={{ ...pageStyle(p), padding: '36px 44px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 18,
        }}
      >
        <div>
          <h1 style={{ fontFamily: serif, fontSize: 30, margin: 0, color: p.primary }}>{b.name}</h1>
          <div style={{ fontSize: 12, marginTop: 4, fontWeight: 600 }}>{b.label}</div>
        </div>
        <div style={{ fontSize: 10, textAlign: 'right', color: p.text }}>
          {b.email && <div>{b.email}</div>}
          {b.phone && <div>{b.phone}</div>}
          {b.location?.city && <div>{b.location.city}</div>}
        </div>
      </header>
      <SectionValidator value={b.summary}>
        <section style={{ marginBottom: 16 }}>
          <SectionHeading title="Summary" p={p} variant="underline" />
          <RichText html={b.summary} p={p} />
        </section>
      </SectionValidator>
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 16 }}>
          <SectionHeading title="Career Experience" p={p} variant="underline" />
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
        <section style={{ marginBottom: 16 }}>
          <SectionHeading title="Education" p={p} variant="underline" />
          {data.education.map((e: any) => (
            <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
              <strong>{e.studyType}</strong>, {e.area} — {e.institution} ({e.startDate}–{e.endDate})
            </div>
          ))}
        </section>
      </SectionValidator>
      {skillNames.length > 0 && (
        <section>
          <SectionHeading title="Technical Proficiencies" p={p} variant="underline" />
          <p style={{ fontSize: 10.5, margin: 0, lineHeight: 1.6 }}>{skillsLine}</p>
        </section>
      )}
    </div>
  );
}
