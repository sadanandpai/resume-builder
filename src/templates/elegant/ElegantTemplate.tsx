import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillDotGrid,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette, withAlpha } from './resumePalette';

export default function ElegantTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const head = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.88)',
    primary: '#fff',
    accent: p.accent,
  });

  return (
    <div style={pageStyle(p)}>
      <header
        style={{
          background: p.primary,
          color: '#fff',
          padding: '24px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <ProfileAvatar src={b.image} size={80} border={`3px solid ${withAlpha('#fff', 0.6)}`} />
        <div style={{ flex: 1 }}>
          <H1 p={head} size={28} color="#fff">
            {b.name}
          </H1>
          <div style={{ fontSize: 12, opacity: 0.95 }}>{b.label}</div>
          <div style={{ marginTop: 10, fontSize: 10 }}>
            <ContactBlock
              email={b.email}
              phone={b.phone}
              city={b.location?.city}
              url={b.url}
              inline
              color="#fff"
            />
          </div>
        </div>
      </header>
      <div
        style={{ display: 'grid', gridTemplateColumns: '30% 1fr', gap: 24, padding: '26px 36px' }}
      >
        <aside>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Key Skills" p={p} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillDotGrid key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.tools}>
            <section>
              <SectionHeading title="Tools" p={p} variant="bar" />
              {data.skills.tools.map((s: any, i: number) => (
                <SkillDotGrid key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
        </aside>
        <main>
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Professional Experience" p={p} variant="bar" />
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
                  <strong>{e.studyType}</strong> — {e.area}
                  <div style={{ color: p.muted }}>{e.institution}</div>
                </div>
              ))}
            </section>
          </SectionValidator>
        </main>
      </div>
    </div>
  );
}
