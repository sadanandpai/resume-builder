import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillDots,
  SocialIconsRow,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette, withAlpha } from './resumePalette';

export default function SidebarRightTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), display: 'grid', gridTemplateColumns: '1fr 32%' }}>
      <main style={{ padding: '34px 28px' }}>
        <H1 p={p} size={28}>
          {b.name}
        </H1>
        <Label p={p}>{b.label}</Label>
        <div style={{ height: 3, width: 56, background: p.accent, margin: '12px 0 18px 0' }} />
        <SectionValidator value={b.summary}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Summary" p={p} variant="bar" />
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
        <SectionValidator value={data.activities?.involvements}>
          <section>
            <SectionHeading title="Key Projects" p={p} variant="bar" />
            <RichText html={data.activities.involvements} p={p} />
          </section>
        </SectionValidator>
      </main>
      <aside
        style={{
          background: withAlpha(p.primary, 0.06),
          padding: '34px 22px',
          borderLeft: `4px solid ${p.accent}`,
        }}
      >
        <ProfileAvatar src={b.image} size={88} />
        <div style={{ marginTop: 12 }}>
          <SectionHeading title="Contact" p={p} variant="bar" />
          <ContactBlock email={b.email} phone={b.phone} city={b.location?.city} url={b.url} />
          <div style={{ marginTop: 8 }}>
            <SocialIconsRow profiles={b.profiles} color={p.primary} />
          </div>
        </div>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <div style={{ marginTop: 16 }}>
            <SectionHeading title="Skills" p={p} variant="bar" />
            {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
              <SkillDots key={i} name={s.name} level={s.level} p={p} />
            ))}
          </div>
        </SectionValidator>
        <SectionValidator value={data.education}>
          <div style={{ marginTop: 16 }}>
            <SectionHeading title="Education" p={p} variant="bar" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 8, fontSize: 10.5 }}>
                <div style={{ fontWeight: 600 }}>
                  {e.studyType} · {e.area}
                </div>
                <div style={{ color: p.muted }}>{e.institution}</div>
                <div style={{ color: p.muted }}>
                  {e.startDate} – {e.endDate}
                </div>
              </div>
            ))}
          </div>
        </SectionValidator>
      </aside>
    </div>
  );
}
