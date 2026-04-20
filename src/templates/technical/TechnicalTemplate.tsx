import { useContext, CSSProperties } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, RichText, SectionHeading, SkillBar, formatDateRange } from './atoms';
import { H1, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function TechnicalTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', 'Menlo', monospace" };

  return (
    <div style={{ ...pageStyle(p), padding: '34px 40px' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px dashed ${p.divider}`,
          paddingBottom: 14,
        }}
      >
        <div>
          <div style={{ ...mono, color: p.accent, fontSize: 11 }}>&lt;hello /&gt;</div>
          <H1 p={p} size={26}>
            {b.name}
          </H1>
          <div style={{ ...mono, fontSize: 11, color: p.muted }}>
            {'// '}
            {b.label}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 10.5, ...mono }}>
          {b.email && <div>{b.email}</div>}
          {b.phone && <div>{b.phone}</div>}
          {b.location?.city && <div>{b.location.city}</div>}
          {b.url && <div>{b.url}</div>}
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 38%', gap: 22, marginTop: 16 }}>
        <div>
          <SectionValidator value={b.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="// about" p={p} variant="bar" />
              <RichText html={b.summary} p={p} />
            </section>
          </SectionValidator>
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="// experience" p={p} variant="bar" />
              {data.work.map((w: any) => (
                <div key={w.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>
                        {w.position} <span style={{ color: p.accent }}>@</span> {w.name}
                      </div>
                    </div>
                    <div style={{ ...mono, color: p.muted, fontSize: 10 }}>
                      {formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                    </div>
                  </div>
                  <RichText html={w.summary} p={p} />
                </div>
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.activities?.involvements}>
            <section>
              <SectionHeading title="// projects" p={p} variant="bar" />
              <RichText html={data.activities.involvements} p={p} />
            </section>
          </SectionValidator>
        </div>
        <aside>
          <SectionValidator value={data.skills.languages}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="// languages" p={p} variant="bar" />
              {data.skills.languages.map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={p} />
              ))}
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.frameworks.concat(data.skills.libraries)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="// frameworks" p={p} variant="bar" />
              <ChipList
                items={data.skills.frameworks.concat(data.skills.libraries)}
                p={p}
                variant="soft"
              />
            </section>
          </SectionValidator>
          <SectionValidator value={data.skills.tools.concat(data.skills.databases)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="// stack" p={p} variant="bar" />
              <ChipList
                items={data.skills.tools.concat(data.skills.databases)}
                p={p}
                variant="outline"
              />
            </section>
          </SectionValidator>
          <SectionValidator value={data.education}>
            <section>
              <SectionHeading title="// education" p={p} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} · {e.area}
                  </div>
                  <div style={{ color: p.muted, ...mono }}>
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
