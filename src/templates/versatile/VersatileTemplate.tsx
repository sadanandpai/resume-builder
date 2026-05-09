import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ProfileAvatar, RichText, SectionHeading, SkillStars, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function VersatileTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading
                title="Professional Experience"
                p={resumePalette}
                variant="underline"
              />
              {data.work.map((w: any) => (
                <div key={w.id} style={{ marginBottom: 10 }}>
                  <JobHeader
                    position={w.position}
                    company={w.name}
                    date={formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                    p={resumePalette}
                  />
                  <RichText html={w.summary} p={resumePalette} />
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Education" p={resumePalette} variant="underline" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <strong>{e.studyType}</strong> — {e.area} · {e.institution} ({e.startDate}–
                  {e.endDate})
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'skills_merged':
        return (
          <SectionValidator
            value={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
          >
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Key Skills" p={resumePalette} variant="underline" />
              {data.skills.languages
                .concat(data.skills.frameworks, data.skills.tools)
                .map((s: any, i: number) => (
                  <SkillStars key={i} name={s.name} level={s.level} p={resumePalette} />
                ))}
            </section>
          </SectionValidator>
        );
      case 'awards':
        return (
          <SectionValidator value={data.awards}>
            <section>
              <SectionHeading title="Certifications" p={resumePalette} variant="underline" />
              {data.awards.map((a: any) => (
                <div key={a.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
                  {a.title} — {a.awarder}
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), padding: '32px 40px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ProfileAvatar src={basics.image} size={64} />
          <div>
            <H1 p={resumePalette} size={26}>
              {basics.name}
            </H1>
            <div style={{ color: resumePalette.primary, fontWeight: 600, fontSize: 12 }}>
              {basics.label}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: resumePalette.muted, textAlign: 'right' }}>
          {basics.email && <div>{basics.email}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {basics.location?.city && <div>{basics.location.city}</div>}
        </div>
      </header>
      <div style={{ height: 2, background: resumePalette.primary, margin: '14px 0 18px' }} />
      <SortableRegion regionId="main" items={regions.main}>
        {(id) => (
          <SortableTemplateSection key={id} id={id}>
            {renderSection(id)}
          </SortableTemplateSection>
        )}
      </SortableRegion>
    </div>
  );
}
