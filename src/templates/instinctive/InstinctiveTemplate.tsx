import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  SectionRule,
  formatDateRange,
} from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

const serif = "'Georgia', serif";

export default function InstinctiveTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '32px 40px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <ProfileAvatar src={b.image} size={76} />
        <div>
          <h1 style={{ fontFamily: serif, fontSize: 28, margin: 0, color: p.primary }}>{b.name}</h1>
          <div style={{ fontSize: 12, fontWeight: 600, color: p.primary }}>{b.label}</div>
          <div style={{ fontSize: 10, color: p.muted, marginTop: 6 }}>
            {[b.email, b.phone].filter(Boolean).join(' · ')}
          </div>
        </div>
      </header>
      <SectionRule p={p} thick />
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 12 }}>
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
      <SectionRule p={p} thick />
      <SectionValidator value={data.education}>
        <section style={{ marginBottom: 12 }}>
          <SectionHeading title="Education" p={p} variant="underline" />
          {data.education.map((e: any) => (
            <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
              <strong>{e.studyType}</strong> — {e.area}, {e.institution}
            </div>
          ))}
        </section>
      </SectionValidator>
      <SectionRule p={p} thick />
      <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
        <section>
          <SectionHeading title="Key Skills" p={p} variant="underline" />
          {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
            <SkillBar key={i} name={s.name} level={s.level} p={p} />
          ))}
        </section>
      </SectionValidator>
    </div>
  );
}
