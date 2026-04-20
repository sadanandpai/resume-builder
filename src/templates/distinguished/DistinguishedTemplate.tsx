import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ProfileAvatar, RichText, SectionHeading, SkillBarThick, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function DistinguishedTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '36px 40px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <ProfileAvatar src={b.image} size={72} />
        <div>
          <H1 p={p} size={28}>
            {b.name}
          </H1>
          <div style={{ fontSize: 12, color: p.primary, fontWeight: 600 }}>{b.label}</div>
          <div style={{ fontSize: 10, color: p.muted, marginTop: 6 }}>
            {[b.email, b.phone, b.location?.city].filter(Boolean).join(' · ')}
          </div>
        </div>
      </header>
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
              <strong>{e.studyType}</strong> — {e.area}, {e.institution}
            </div>
          ))}
        </section>
      </SectionValidator>
      <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
        <section>
          <SectionHeading title="Key Skills" p={p} variant="underline" />
          {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
            <SkillBarThick key={i} name={s.name} level={s.level} p={p} height={10} />
          ))}
        </section>
      </SectionValidator>
    </div>
  );
}
