import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillDots,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette } from './resumePalette';

export default function SplitHeaderTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const inv = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.9)',
    primary: '#fff',
    accent: p.accent,
  });

  return (
    <div style={pageStyle(p)}>
      <div style={{ display: 'grid', gridTemplateColumns: '34% 1fr', minHeight: 120 }}>
        <div style={{ background: p.divider }}>
          <ProfileAvatar src={b.image} size={120} radius="0" />
        </div>
        <div
          style={{
            background: p.primary,
            color: '#fff',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <H1 p={inv} size={26} color="#fff">
            {b.name}
          </H1>
          <div style={{ fontSize: 12, opacity: 0.95 }}>{b.label}</div>
          <div style={{ marginTop: 12, fontSize: 10 }}>
            <ContactBlock
              email={b.email}
              phone={b.phone}
              city={b.location?.city}
              url={b.url}
              color="#fff"
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '34% 1fr', gap: 0 }}>
        <aside style={{ padding: '22px 20px', borderRight: `1px solid ${p.divider}` }}>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Skills" p={p} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillDots key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.practices}>
            <section>
              <SectionHeading title="Practices" p={p} variant="bar" />
              {data.skills.practices.map((s: any, i: number) => (
                <SkillDots key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
        </aside>
        <main style={{ padding: '22px 28px' }}>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Profile" p={p} variant="bar" />
              <RichText html={b.summary} p={p} />
            </section>
          </SectionValidator>
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Employment History" p={p} variant="bar" />
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
