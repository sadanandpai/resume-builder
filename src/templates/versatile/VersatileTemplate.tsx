import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ProfileAvatar, RichText, SectionHeading, SkillStars, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function VersatileTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '32px 40px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ProfileAvatar src={b.image} size={64} />
          <div>
            <H1 p={p} size={26}>
              {b.name}
            </H1>
            <div style={{ color: p.primary, fontWeight: 600, fontSize: 12 }}>{b.label}</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: p.muted, textAlign: 'right' }}>
          {b.email && <div>{b.email}</div>}
          {b.phone && <div>{b.phone}</div>}
          {b.location?.city && <div>{b.location.city}</div>}
        </div>
      </header>
      <div style={{ height: 2, background: p.primary, margin: '14px 0 18px' }} />
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
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Education" p={p} variant="underline" />
          {data.education.map((e: any) => (
            <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
              <strong>{e.studyType}</strong> — {e.area} · {e.institution} ({e.startDate}–{e.endDate}
              )
            </div>
          ))}
        </section>
      </SectionValidator>
      <SectionValidator
        value={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
      >
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Key Skills" p={p} variant="underline" />
          {data.skills.languages
            .concat(data.skills.frameworks, data.skills.tools)
            .map((s: any, i: number) => (
              <SkillStars key={i} name={s.name} level={s.level} p={p} />
            ))}
        </section>
      </SectionValidator>
      <SectionValidator value={data.awards}>
        <section>
          <SectionHeading title="Certifications" p={p} variant="underline" />
          {data.awards.map((a: any) => (
            <div key={a.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              {a.title} — {a.awarder}
            </div>
          ))}
        </section>
      </SectionValidator>
    </div>
  );
}
