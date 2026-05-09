import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function AccessibleTemplate() {
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
              <SectionHeading title="Experience" p={resumePalette} variant="underline" />
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
                <div key={e.id} style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} — {e.area}
                  </div>
                  <div style={{ color: resumePalette.muted, fontSize: 10.5 }}>
                    {e.institution} · {e.startDate}–{e.endDate}
                  </div>
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'skills':
        return (
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section>
              <SectionHeading title="Skills" p={resumePalette} variant="underline" />
              <ChipList
                items={data.skills.languages.concat(data.skills.frameworks)}
                p={resumePalette}
                variant="outline"
              />
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), padding: '36px 40px' }}>
      <header style={{ marginBottom: 18 }}>
        <H1 p={resumePalette} size={28}>
          {basics.name}
        </H1>
        <div style={{ fontSize: 12, color: resumePalette.primary, fontWeight: 600 }}>
          {basics.label}
        </div>
        <div style={{ fontSize: 10, color: resumePalette.muted, marginTop: 8 }}>
          {[basics.email, basics.phone, basics.location?.city].filter(Boolean).join(' · ')}
        </div>
      </header>
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
