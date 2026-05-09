import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, formatDateRange } from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

const serif = "'Georgia', serif";

export default function PlainTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  margin: '0 0 12px 0',
                  borderBottom: `1px solid ${resumePalette.divider}`,
                  paddingBottom: 4,
                }}
              >
                Professional Experience
              </h3>
              {data.work.map((w: any) => (
                <div key={w.id} style={{ marginBottom: 12 }}>
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
            <section style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  margin: '0 0 12px 0',
                  borderBottom: `1px solid ${resumePalette.divider}`,
                  paddingBottom: 4,
                }}
              >
                Education
              </h3>
              {data.education.map((e: any) => (
                <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                  <strong>{e.studyType}</strong>, {e.area} — {e.institution} ({e.startDate}–
                  {e.endDate})
                </div>
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
                  {a.title} ({a.awarder})
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
    <div style={{ ...pageStyle(resumePalette), padding: '40px 48px' }}>
      <div
        style={{
          textAlign: 'center',
          borderBottom: `1px solid ${resumePalette.divider}`,
          paddingBottom: 16,
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontFamily: serif, fontSize: 32, margin: 0, color: resumePalette.text }}>
          {basics.name}
        </h1>
        <div
          style={{
            fontSize: 12,
            marginTop: 6,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {basics.label}
        </div>
        <div style={{ fontSize: 10.5, color: resumePalette.muted, marginTop: 10 }}>
          {[basics.email, basics.phone, basics.location?.city, basics.url]
            .filter(Boolean)
            .join(' · ')}
        </div>
      </div>
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
