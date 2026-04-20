import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  SectionRule,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function AccessibleTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '32px 40px' }}>
      <header
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <div>
          <H1 p={p} size={30}>
            {b.name}
          </H1>
          <Label p={p}>{b.label}</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <ContactBlock email={b.email} phone={b.phone} city={b.location?.city} url={b.url} />
          <ProfileAvatar src={b.image} size={72} />
        </div>
      </header>
      <SectionRule p={p} thick />
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
      <SectionRule p={p} thick />
      <SectionValidator value={data.education}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Education" p={p} variant="underline" />
          {data.education.map((e: any) => (
            <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
              <strong>{e.studyType}</strong> — {e.area} · {e.institution}
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
