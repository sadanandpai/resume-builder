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
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function PlayfulTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={pageStyle(p)}>
      <div style={{ background: p.primary, color: '#fff', padding: '20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <ProfileAvatar src={b.image} size={88} border="3px solid #fff" />
          <div style={{ flex: 1 }}>
            <H1 p={p} size={28} color="#fff">
              {b.name}
            </H1>
            <Label p={p} color="rgba(255,255,255,0.9)">
              {b.label}
            </Label>
          </div>
        </div>
        <div
          style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.35)' }}
        >
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
      <div style={{ padding: '22px 28px' }}>
        <SectionValidator value={b.summary}>
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Summary" p={p} variant="bar" />
            <RichText html={b.summary} p={p} />
          </section>
        </SectionValidator>
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
          <section style={{ marginBottom: 14 }}>
            <SectionHeading title="Education" p={p} variant="bar" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                <strong>{e.studyType}</strong> — {e.area} · {e.institution} ({e.startDate}–
                {e.endDate})
              </div>
            ))}
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
        <SectionValidator value={data.awards}>
          <section style={{ marginTop: 14 }}>
            <SectionHeading title="Certifications" p={p} variant="bar" />
            {data.awards.map((a: any) => (
              <div key={a.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
                <strong>{a.title}</strong> — {a.awarder}
              </div>
            ))}
          </section>
        </SectionValidator>
      </div>
    </div>
  );
}
