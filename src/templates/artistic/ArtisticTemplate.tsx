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

export default function ArtisticTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const side = mergeResumePalette(p, {
    text: '#fff',
    muted: 'rgba(255,255,255,0.82)',
    primary: '#fff',
    divider: 'rgba(255,255,255,0.25)',
    accent: p.accent,
  });

  return (
    <div style={{ ...pageStyle(p), display: 'grid', gridTemplateColumns: '1fr 34%' }}>
      <main style={{ padding: '30px 28px' }}>
        <H1 p={p} size={26}>
          {b.name}
        </H1>
        <Label p={p}>{b.label}</Label>
        <SectionValidator value={b.summary}>
          <section style={{ marginTop: 16, marginBottom: 14 }}>
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
          <section>
            <SectionHeading title="Education" p={p} variant="underline" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                <strong>{e.studyType}</strong> · {e.area}
                <div style={{ color: p.muted }}>{e.institution}</div>
              </div>
            ))}
          </section>
        </SectionValidator>
      </main>
      <aside
        style={{
          background: p.sidebarBg,
          color: '#fff',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <ProfileAvatar src={b.image} size={92} border={`3px solid ${withAlpha('#fff', 0.5)}`} />
        <div>
          <SectionHeading title="Contact" p={side} variant="line" />
          <ContactBlock
            email={b.email}
            phone={b.phone}
            city={b.location?.city}
            url={b.url}
            color="#fff"
          />
          <div style={{ marginTop: 8 }}>
            <SocialIconsRow profiles={b.profiles} color="#fff" />
          </div>
        </div>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <div>
            <SectionHeading title="Key Skills" p={side} variant="line" />
            {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${withAlpha('#fff', 0.35)}`,
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 8,
                }}
              >
                <SkillBar
                  name={s.name}
                  level={s.level}
                  p={mergeResumePalette(p, { divider: 'rgba(255,255,255,0.25)', text: '#fff' })}
                />
              </div>
            ))}
          </div>
        </SectionValidator>
      </aside>
    </div>
  );
}
