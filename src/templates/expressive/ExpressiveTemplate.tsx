import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillStars,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette } from './resumePalette';

export default function ExpressiveTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const head = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.9)',
    primary: '#fff',
    accent: p.accent,
  });

  return (
    <div style={pageStyle(p)}>
      <header
        style={{
          background: p.primary,
          color: '#fff',
          padding: '26px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <ProfileAvatar src={b.image} size={86} border="3px solid rgba(255,255,255,0.5)" />
        <div style={{ flex: 1 }}>
          <H1 p={head} size={30} color="#fff">
            {b.name}
          </H1>
          <div style={{ fontSize: 12, opacity: 0.95 }}>{b.label}</div>
          <div style={{ marginTop: 10 }}>
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
        style={{ display: 'grid', gridTemplateColumns: '32% 1fr', gap: 22, padding: '26px 36px' }}
      >
        <aside>
          <SectionValidator value={data.education}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Education" p={p} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ fontSize: 10.5, marginBottom: 8 }}>
                  <strong>{e.studyType}</strong>
                  <div>{e.area}</div>
                  <div style={{ color: p.muted }}>{e.institution}</div>
                </div>
              ))}
            </section>
          </SectionValidator>
          <SectionValidator
            value={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
          >
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Key Skills" p={p} variant="bar" />
              {data.skills.languages
                .concat(data.skills.frameworks, data.skills.tools)
                .map((s: any, i: number) => (
                  <SkillStars key={i} name={s.name} level={s.level} p={p} />
                ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.awards}>
            <section>
              <SectionHeading title="Certifications" p={p} variant="bar" />
              {data.awards.map((a: any) => (
                <div key={a.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
                  {a.title}
                </div>
              ))}
            </section>
          </SectionValidator>
        </aside>
        <main>
          <SectionValidator value={data.work}>
            <section>
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
        </main>
      </div>
    </div>
  );
}
