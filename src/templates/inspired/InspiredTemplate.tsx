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
import { useResumePalette, withAlpha } from './resumePalette';

export default function InspiredTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 220,
          height: 200,
          background: withAlpha(p.primary, 0.18),
          borderBottomRightRadius: '100%',
        }}
      />
      <header
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '28px 32px 16px',
        }}
      >
        <ProfileAvatar src={b.image} size={84} border={`4px solid ${p.primary}`} />
        <div
          style={{
            flex: 1,
            background: p.primary,
            color: '#fff',
            padding: '16px 20px',
            borderRadius: 8,
          }}
        >
          <H1 p={p} size={24} color="#fff">
            {b.name}
          </H1>
          <div style={{ fontSize: 11, opacity: 0.95, marginTop: 4 }}>{b.label}</div>
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
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 36%',
          gap: 20,
          padding: '8px 32px 28px',
          position: 'relative',
        }}
      >
        <div>
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
        </div>
        <aside style={{ background: withAlpha(p.primary, 0.08), padding: 16, borderRadius: 10 }}>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Summary" p={p} variant="bar" />
              <RichText html={b.summary} p={p} />
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section>
              <SectionHeading title="Key Skills" p={p} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
        </aside>
      </div>
    </div>
  );
}
