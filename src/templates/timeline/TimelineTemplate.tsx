import { useContext, CSSProperties } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ChipList,
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function TimelineTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;
  const dotStyle: CSSProperties = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: p.accent,
    position: 'absolute',
    left: -5,
    top: 4,
  };

  return (
    <div style={{ ...pageStyle(p), padding: '36px 40px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 18 }}>
        <ProfileAvatar src={b.image} size={80} />
        <div style={{ flex: 1 }}>
          <H1 p={p} size={26}>
            {b.name}
          </H1>
          <Label p={p}>{b.label}</Label>
          <div style={{ marginTop: 8 }}>
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
      <SectionValidator value={b.summary}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="About Me" p={p} variant="pill" />
          <RichText html={b.summary} p={p} />
        </section>
      </SectionValidator>
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Career Timeline" p={p} variant="pill" />
          <div
            style={{
              borderLeft: `2px solid ${p.divider}`,
              marginLeft: 6,
              paddingLeft: 18,
              position: 'relative',
            }}
          >
            {data.work.map((w: any) => (
              <div key={w.id} style={{ position: 'relative', marginBottom: 12 }}>
                <span style={dotStyle} />
                <JobHeader
                  position={w.position}
                  company={w.name}
                  date={formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                  p={p}
                />
                <RichText html={w.summary} p={p} />
              </div>
            ))}
          </div>
        </section>
      </SectionValidator>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <SectionValidator value={data.education}>
          <section>
            <SectionHeading title="Education" p={p} variant="pill" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>
                  {e.studyType} — {e.area}
                </div>
                <div style={{ color: p.muted, fontSize: 10.5 }}>
                  {e.institution} · {e.startDate}–{e.endDate}
                </div>
              </div>
            ))}
          </section>
        </SectionValidator>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <section>
            <SectionHeading title="Skills" p={p} variant="pill" />
            <ChipList
              items={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
              p={p}
              variant="soft"
            />
          </section>
        </SectionValidator>
      </div>
    </div>
  );
}
