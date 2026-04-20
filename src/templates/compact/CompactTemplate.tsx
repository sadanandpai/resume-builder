import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, RichText, SectionHeading, SkillDots, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function CompactTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '28px 32px', fontSize: 10.5 }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderBottom: `3px solid ${p.accent}`,
          paddingBottom: 10,
          marginBottom: 14,
        }}
      >
        <div>
          <H1 p={p} size={24}>
            {b.name}
          </H1>
          <div style={{ fontSize: 11.5, color: p.muted }}>{b.label}</div>
        </div>
        <div style={{ fontSize: 10, textAlign: 'right' }}>
          {b.phone && <div>{b.phone}</div>}
          {b.email && <div>{b.email}</div>}
          {b.location?.city && <div>{b.location.city}</div>}
          {b.url && <div>{b.url}</div>}
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="Profile" p={p} variant="underline" />
              <RichText html={b.summary} p={p} />
            </section>
          </SectionValidator>
          <SectionValidator value={data.work}>
            <section>
              <SectionHeading title="Experience" p={p} variant="underline" />
              {data.work.map((w: any) => (
                <div key={w.id} style={{ marginBottom: 8 }}>
                  <JobHeader
                    compact
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
        <div>
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="Expertise" p={p} variant="underline" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillDots key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.tools}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="Tools" p={p} variant="underline" />
              <ChipList items={data.skills.tools} p={p} variant="outline" />
            </section>
          </SectionValidator>
          <SectionValidator value={data.education}>
            <section>
              <SectionHeading title="Education" p={p} variant="underline" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 4 }}>
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
        </div>
      </div>
    </div>
  );
}
