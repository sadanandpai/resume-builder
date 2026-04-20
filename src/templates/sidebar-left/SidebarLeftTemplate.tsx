import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  SocialIconsRow,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette, withAlpha } from './resumePalette';

export default function SidebarLeftTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const side = mergeResumePalette(p, {
    primary: p.sidebarText,
    divider: withAlpha(p.sidebarText, 0.2),
    muted: withAlpha(p.sidebarText, 0.65),
    accent: p.accent,
  });
  const skillBarP = mergeResumePalette(p, {
    divider: withAlpha(p.sidebarText, 0.15),
    muted: withAlpha(p.sidebarText, 0.65),
    accent: p.accent,
  });

  return (
    <div style={{ ...pageStyle(p), display: 'grid', gridTemplateColumns: '34% 1fr' }}>
      <aside
        style={{
          background: p.sidebarBg,
          color: p.sidebarText,
          padding: '32px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <ProfileAvatar src={b.image} size={96} border={`3px solid ${p.accent}`} />
        <div>
          <SectionHeading title="Contact" p={side} variant="line" />
          <ContactBlock
            email={b.email}
            phone={b.phone}
            city={b.location?.city}
            url={b.url}
            color={p.sidebarText}
          />
          <div style={{ marginTop: 10 }}>
            <SocialIconsRow profiles={b.profiles} color={p.sidebarText} />
          </div>
        </div>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <div>
            <SectionHeading title="Skills" p={side} variant="line" />
            {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
              <SkillBar key={i} name={s.name} level={s.level} p={skillBarP} />
            ))}
          </div>
        </SectionValidator>
        <SectionValidator value={data.education}>
          <div>
            <SectionHeading title="Education" p={side} variant="line" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 8, fontSize: 10.5 }}>
                <div style={{ fontWeight: 600 }}>{e.studyType}</div>
                <div style={{ opacity: 0.85 }}>{e.area}</div>
                <div style={{ opacity: 0.7 }}>{e.institution}</div>
                <div style={{ opacity: 0.6 }}>
                  {e.startDate} – {e.endDate}
                </div>
              </div>
            ))}
          </div>
        </SectionValidator>
      </aside>
      <main style={{ padding: '32px 28px' }}>
        <H1 p={p} size={28}>
          {b.name}
        </H1>
        <Label p={p}>{b.label}</Label>
        <div style={{ height: 2, width: 48, background: p.accent, margin: '12px 0' }} />
        <SectionValidator value={b.summary}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Profile" p={p} variant="bar" />
            <RichText html={b.summary} p={p} />
          </section>
        </SectionValidator>
        <SectionValidator value={data.work}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Experience" p={p} variant="bar" />
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
        <SectionValidator value={data.activities?.achievements}>
          <section>
            <SectionHeading title="Awards" p={p} variant="bar" />
            <RichText html={data.activities.achievements} p={p} />
          </section>
        </SectionValidator>
      </main>
    </div>
  );
}
