import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ChipList,
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function HeaderBandTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p) }}>
      <header
        style={{
          background: p.primary,
          color: '#fff',
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <ProfileAvatar src={b.image} size={84} border={`3px solid ${p.accent}`} />
        <div style={{ flex: 1 }}>
          <H1 p={p} size={28} color="#fff">
            {b.name}
          </H1>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.9,
              marginTop: 4,
            }}
          >
            {b.label}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <ContactBlock
            email={b.email}
            phone={b.phone}
            city={b.location?.city}
            url={b.url}
            color="#fff"
          />
        </div>
      </header>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 38%', padding: '26px 36px', gap: 26 }}
      >
        <div>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="About" p={p} variant="bar" />
              <RichText html={b.summary} p={p} />
            </section>
          </SectionValidator>
          <SectionValidator value={data.work}>
            <section>
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
        </div>
        <aside>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Skills" p={p} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.tools}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Tools" p={p} variant="bar" />
              <ChipList items={data.skills.tools} p={p} variant="soft" />
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
      </div>
    </div>
  );
}
