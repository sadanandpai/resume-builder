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
import { useResumePalette, withAlpha } from './resumePalette';

export default function CreativeTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p) }}>
      <header style={{ position: 'relative', padding: '36px 36px 22px', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: withAlpha(p.accent, 0.2),
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 120,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: withAlpha(p.primary, 0.15),
          }}
        />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProfileAvatar src={b.image} size={90} radius="16px" border={`3px solid ${p.accent}`} />
          <div>
            <H1 p={p} size={30}>
              {b.name}
            </H1>
            <Label p={p} color={p.accent}>
              {b.label}
            </Label>
          </div>
        </div>
      </header>
      <div
        style={{ display: 'grid', gridTemplateColumns: '38% 1fr', padding: '0 36px 30px', gap: 24 }}
      >
        <aside>
          <section
            style={{
              background: withAlpha(p.primary, 0.08),
              padding: 14,
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <SectionHeading title="Contact" p={p} variant="bar" />
            <ContactBlock email={b.email} phone={b.phone} city={b.location?.city} url={b.url} />
            <div style={{ marginTop: 8 }}>
              <SocialIconsRow profiles={b.profiles} color={p.primary} />
            </div>
          </section>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="Skills" p={p} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.education}>
            <section>
              <SectionHeading title="Education" p={p} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} · {e.area}
                  </div>
                  <div style={{ color: p.muted }}>
                    {e.institution} · {e.startDate}–{e.endDate}
                  </div>
                </div>
              ))}
            </section>
          </SectionValidator>
        </aside>
        <main>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="About Me" p={p} variant="bar" />
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
        </main>
      </div>
    </div>
  );
}
