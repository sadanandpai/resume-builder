import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette } from './resumePalette';

export default function BalancedTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const side = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.85)',
    primary: '#fff',
    divider: 'rgba(255,255,255,0.25)',
    accent: p.accent,
  });

  return (
    <div style={pageStyle(p)}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '22px 32px',
          borderBottom: `1px solid ${p.divider}`,
        }}
      >
        <ProfileAvatar src={b.image} size={78} />
        <div style={{ flex: 1 }}>
          <H1 p={p} size={26}>
            {b.name}
          </H1>
          <div style={{ fontSize: 12, color: p.primary, fontWeight: 600 }}>{b.label}</div>
          <div style={{ fontSize: 10, color: p.muted, marginTop: 6 }}>
            <ContactBlock
              email={b.email}
              phone={b.phone}
              city={b.location?.city}
              url={b.url}
              inline
            />
          </div>
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 36%' }}>
        <main style={{ padding: '24px 28px' }}>
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
                  <strong>{e.studyType}</strong> — {e.area}
                  <div style={{ color: p.muted }}>{e.institution}</div>
                </div>
              ))}
            </section>
          </SectionValidator>
        </main>
        <aside style={{ background: p.sidebarBg, color: '#fff', padding: '24px 20px' }}>
          <SectionHeading title="Details" p={side} variant="line" />
          <div style={{ fontSize: 10, marginBottom: 16 }}>
            {b.email && <div>{b.email}</div>}
            {b.phone && <div>{b.phone}</div>}
            {b.location?.city && <div>{b.location.city}</div>}
          </div>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section>
              <SectionHeading title="Skills" p={side} variant="line" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={side} />
              ))}
            </section>
          </SectionValidator>
        </aside>
      </div>
    </div>
  );
}
